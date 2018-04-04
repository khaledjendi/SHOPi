/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { SnapshotVersion } from '../core/snapshot_version';
import { Timestamp } from '../core/timestamp';
import { documentKeySet } from '../model/collections';
import { DocumentKey } from '../model/document_key';
import { assert, fail } from '../util/assert';
import { immediateSuccessor } from '../util/misc';
import * as EncodedResourcePath from './encoded_resource_path';
import { DbTarget, DbTargetDocument, DbTargetGlobal } from './indexeddb_schema';
import { PersistencePromise } from './persistence_promise';
import { SimpleDbTransaction } from './simple_db';
var IndexedDbQueryCache = /** @class */ (function () {
    function IndexedDbQueryCache(serializer) {
        this.serializer = serializer;
        /**
         * The last received snapshot version. We store this seperately from the
         * metadata to avoid the extra conversion to/from DbTimestamp.
         */
        this.lastRemoteSnapshotVersion = SnapshotVersion.MIN;
        /**
         * A cached copy of the metadata for the query cache.
         */
        this.metadata = null;
        /** The garbage collector to notify about potential garbage keys. */
        this.garbageCollector = null;
    }
    IndexedDbQueryCache.prototype.start = function (transaction) {
        var _this = this;
        return globalTargetStore(transaction)
            .get(DbTargetGlobal.key)
            .next(function (metadata) {
            assert(metadata !== null, 'Missing metadata row that should be added by schema migration.');
            _this.metadata = metadata;
            var lastSavedVersion = metadata.lastRemoteSnapshotVersion;
            _this.lastRemoteSnapshotVersion = SnapshotVersion.fromTimestamp(new Timestamp(lastSavedVersion.seconds, lastSavedVersion.nanos));
            return PersistencePromise.resolve();
        });
    };
    IndexedDbQueryCache.prototype.getHighestTargetId = function () {
        return this.metadata.highestTargetId;
    };
    IndexedDbQueryCache.prototype.getLastRemoteSnapshotVersion = function () {
        return this.lastRemoteSnapshotVersion;
    };
    IndexedDbQueryCache.prototype.setLastRemoteSnapshotVersion = function (transaction, snapshotVersion) {
        this.lastRemoteSnapshotVersion = snapshotVersion;
        this.metadata.lastRemoteSnapshotVersion = snapshotVersion.toTimestamp();
        return globalTargetStore(transaction).put(DbTargetGlobal.key, this.metadata);
    };
    IndexedDbQueryCache.prototype.addQueryData = function (transaction, queryData) {
        var _this = this;
        return this.saveQueryData(transaction, queryData).next(function () {
            _this.metadata.targetCount += 1;
            _this.updateMetadataFromQueryData(queryData);
            return _this.saveMetadata(transaction);
        });
    };
    IndexedDbQueryCache.prototype.updateQueryData = function (transaction, queryData) {
        var _this = this;
        return this.saveQueryData(transaction, queryData).next(function () {
            if (_this.updateMetadataFromQueryData(queryData)) {
                return _this.saveMetadata(transaction);
            }
            else {
                return PersistencePromise.resolve();
            }
        });
    };
    IndexedDbQueryCache.prototype.removeQueryData = function (transaction, queryData) {
        var _this = this;
        assert(this.metadata.targetCount > 0, 'Removing from an empty query cache');
        return this.removeMatchingKeysForTargetId(transaction, queryData.targetId)
            .next(function () { return targetsStore(transaction).delete(queryData.targetId); })
            .next(function () {
            _this.metadata.targetCount -= 1;
            return _this.saveMetadata(transaction);
        });
    };
    IndexedDbQueryCache.prototype.saveMetadata = function (transaction) {
        return globalTargetStore(transaction).put(DbTargetGlobal.key, this.metadata);
    };
    IndexedDbQueryCache.prototype.saveQueryData = function (transaction, queryData) {
        return targetsStore(transaction).put(this.serializer.toDbTarget(queryData));
    };
    /**
     * Updates the in-memory version of the metadata to account for values in the
     * given QueryData. Saving is done separately. Returns true if there were any
     * changes to the metadata.
     */
    IndexedDbQueryCache.prototype.updateMetadataFromQueryData = function (queryData) {
        var needsUpdate = false;
        if (queryData.targetId > this.metadata.highestTargetId) {
            this.metadata.highestTargetId = queryData.targetId;
            needsUpdate = true;
        }
        // TODO(GC): add sequence number check
        return needsUpdate;
    };
    Object.defineProperty(IndexedDbQueryCache.prototype, "count", {
        get: function () {
            return this.metadata.targetCount;
        },
        enumerable: true,
        configurable: true
    });
    IndexedDbQueryCache.prototype.getQueryData = function (transaction, query) {
        var _this = this;
        // Iterating by the canonicalId may yield more than one result because
        // canonicalId values are not required to be unique per target. This query
        // depends on the queryTargets index to be efficent.
        var canonicalId = query.canonicalId();
        var range = IDBKeyRange.bound([canonicalId, Number.NEGATIVE_INFINITY], [canonicalId, Number.POSITIVE_INFINITY]);
        var result = null;
        return targetsStore(transaction)
            .iterate({ range: range, index: DbTarget.queryTargetsIndexName }, function (key, value, control) {
            var found = _this.serializer.fromDbTarget(value);
            // After finding a potential match, check that the query is
            // actually equal to the requested query.
            if (query.isEqual(found.query)) {
                result = found;
                control.done();
            }
        })
            .next(function () { return result; });
    };
    IndexedDbQueryCache.prototype.addMatchingKeys = function (txn, keys, targetId) {
        // PORTING NOTE: The reverse index (documentsTargets) is maintained by
        // Indexeddb.
        var promises = [];
        var store = documentTargetStore(txn);
        keys.forEach(function (key) {
            var path = EncodedResourcePath.encode(key.path);
            promises.push(store.put(new DbTargetDocument(targetId, path)));
        });
        return PersistencePromise.waitFor(promises);
    };
    IndexedDbQueryCache.prototype.removeMatchingKeys = function (txn, keys, targetId) {
        var _this = this;
        // PORTING NOTE: The reverse index (documentsTargets) is maintained by
        // IndexedDb.
        var promises = [];
        var store = documentTargetStore(txn);
        keys.forEach(function (key) {
            var path = EncodedResourcePath.encode(key.path);
            promises.push(store.delete([targetId, path]));
            if (_this.garbageCollector !== null) {
                _this.garbageCollector.addPotentialGarbageKey(key);
            }
        });
        return PersistencePromise.waitFor(promises);
    };
    IndexedDbQueryCache.prototype.removeMatchingKeysForTargetId = function (txn, targetId) {
        var store = documentTargetStore(txn);
        var range = IDBKeyRange.bound([targetId], [targetId + 1], 
        /*lowerOpen=*/ false, 
        /*upperOpen=*/ true);
        return this.notifyGCForRemovedKeys(txn, range).next(function () {
            return store.delete(range);
        });
    };
    IndexedDbQueryCache.prototype.notifyGCForRemovedKeys = function (txn, range) {
        var _this = this;
        var store = documentTargetStore(txn);
        if (this.garbageCollector !== null && this.garbageCollector.isEager) {
            // In order to generate garbage events properly, we need to read these
            // keys before deleting.
            return store.iterate({ range: range, keysOnly: true }, function (key, _, control) {
                var path = EncodedResourcePath.decode(key[1]);
                var docKey = new DocumentKey(path);
                // Paranoid assertion in case the the collector is set to null
                // during the iteration.
                assert(_this.garbageCollector !== null, 'GarbageCollector for query cache set to null during key removal.');
                _this.garbageCollector.addPotentialGarbageKey(docKey);
            });
        }
        else {
            return PersistencePromise.resolve();
        }
    };
    IndexedDbQueryCache.prototype.getMatchingKeysForTargetId = function (txn, targetId) {
        var range = IDBKeyRange.bound([targetId], [targetId + 1], 
        /*lowerOpen=*/ false, 
        /*upperOpen=*/ true);
        var store = documentTargetStore(txn);
        var result = documentKeySet();
        return store
            .iterate({ range: range, keysOnly: true }, function (key, _, control) {
            var path = EncodedResourcePath.decode(key[1]);
            var docKey = new DocumentKey(path);
            result = result.add(docKey);
        })
            .next(function () { return result; });
    };
    IndexedDbQueryCache.prototype.setGarbageCollector = function (gc) {
        this.garbageCollector = gc;
    };
    IndexedDbQueryCache.prototype.containsKey = function (txn, key) {
        assert(txn !== null, 'Persistence Transaction cannot be null for query cache containsKey');
        var path = EncodedResourcePath.encode(key.path);
        var range = IDBKeyRange.bound([path], [immediateSuccessor(path)], 
        /*lowerOpen=*/ false, 
        /*upperOpen=*/ true);
        var count = 0;
        return documentTargetStore(txn)
            .iterate({
            index: DbTargetDocument.documentTargetsIndex,
            keysOnly: true,
            range: range
        }, function (key, _, control) {
            count++;
            control.done();
        })
            .next(function () { return count > 0; });
    };
    return IndexedDbQueryCache;
}());
export { IndexedDbQueryCache };
/**
 * Helper to get a typed SimpleDbStore for the queries object store.
 */
function targetsStore(txn) {
    return getStore(txn, DbTarget.store);
}
/**
 * Helper to get a typed SimpleDbStore for the target globals object store.
 */
function globalTargetStore(txn) {
    return getStore(txn, DbTargetGlobal.store);
}
/**
 * Helper to get a typed SimpleDbStore for the document target object store.
 */
function documentTargetStore(txn) {
    return getStore(txn, DbTargetDocument.store);
}
/**
 * Helper to get a typed SimpleDbStore from a transaction.
 */
function getStore(txn, store) {
    if (txn instanceof SimpleDbTransaction) {
        return txn.store(store);
    }
    else {
        return fail('Invalid transaction object provided!');
    }
}

//# sourceMappingURL=indexeddb_query_cache.js.map
