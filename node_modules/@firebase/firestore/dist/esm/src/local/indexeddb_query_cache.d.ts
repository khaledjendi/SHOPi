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
import { Query } from '../core/query';
import { SnapshotVersion } from '../core/snapshot_version';
import { TargetId } from '../core/types';
import { DocumentKeySet } from '../model/collections';
import { DocumentKey } from '../model/document_key';
import { GarbageCollector } from './garbage_collector';
import { LocalSerializer } from './local_serializer';
import { PersistenceTransaction } from './persistence';
import { PersistencePromise } from './persistence_promise';
import { QueryCache } from './query_cache';
import { QueryData } from './query_data';
export declare class IndexedDbQueryCache implements QueryCache {
    private serializer;
    constructor(serializer: LocalSerializer);
    /**
     * The last received snapshot version. We store this seperately from the
     * metadata to avoid the extra conversion to/from DbTimestamp.
     */
    private lastRemoteSnapshotVersion;
    /**
     * A cached copy of the metadata for the query cache.
     */
    private metadata;
    /** The garbage collector to notify about potential garbage keys. */
    private garbageCollector;
    start(transaction: PersistenceTransaction): PersistencePromise<void>;
    getHighestTargetId(): TargetId;
    getLastRemoteSnapshotVersion(): SnapshotVersion;
    setLastRemoteSnapshotVersion(transaction: PersistenceTransaction, snapshotVersion: SnapshotVersion): PersistencePromise<void>;
    addQueryData(transaction: PersistenceTransaction, queryData: QueryData): PersistencePromise<void>;
    updateQueryData(transaction: PersistenceTransaction, queryData: QueryData): PersistencePromise<void>;
    removeQueryData(transaction: PersistenceTransaction, queryData: QueryData): PersistencePromise<void>;
    private saveMetadata(transaction);
    private saveQueryData(transaction, queryData);
    /**
     * Updates the in-memory version of the metadata to account for values in the
     * given QueryData. Saving is done separately. Returns true if there were any
     * changes to the metadata.
     */
    private updateMetadataFromQueryData(queryData);
    readonly count: number;
    getQueryData(transaction: PersistenceTransaction, query: Query): PersistencePromise<QueryData | null>;
    addMatchingKeys(txn: PersistenceTransaction, keys: DocumentKeySet, targetId: TargetId): PersistencePromise<void>;
    removeMatchingKeys(txn: PersistenceTransaction, keys: DocumentKeySet, targetId: TargetId): PersistencePromise<void>;
    removeMatchingKeysForTargetId(txn: PersistenceTransaction, targetId: TargetId): PersistencePromise<void>;
    private notifyGCForRemovedKeys(txn, range);
    getMatchingKeysForTargetId(txn: PersistenceTransaction, targetId: TargetId): PersistencePromise<DocumentKeySet>;
    setGarbageCollector(gc: GarbageCollector | null): void;
    containsKey(txn: PersistenceTransaction | null, key: DocumentKey): PersistencePromise<boolean>;
}
