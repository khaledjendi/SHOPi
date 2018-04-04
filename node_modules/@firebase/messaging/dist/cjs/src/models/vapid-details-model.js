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
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var db_interface_1 = require("./db-interface");
var errors_1 = require("./errors");
var FCM_VAPID_OBJ_STORE = 'fcm_vapid_object_Store';
var DB_NAME = 'fcm_vapid_details_db';
var DB_VERSION = 1;
var UNCOMPRESSED_PUBLIC_KEY_SIZE = 65;
var VapidDetailsModel = /** @class */ (function (_super) {
    tslib_1.__extends(VapidDetailsModel, _super);
    function VapidDetailsModel() {
        return _super.call(this, DB_NAME, DB_VERSION) || this;
    }
    /**
     * @override
     * @param {IDBDatabase} db
     */
    VapidDetailsModel.prototype.onDBUpgrade = function (db) {
        db.createObjectStore(FCM_VAPID_OBJ_STORE, {
            keyPath: 'swScope'
        });
    };
    /**
     * Given a service worker scope, this method will look up the vapid key
     * in indexedDB.
     */
    VapidDetailsModel.prototype.getVapidFromSWScope = function (swScope) {
        if (typeof swScope !== 'string' || swScope.length === 0) {
            return Promise.reject(this.errorFactory_.create(errors_1.default.codes.BAD_SCOPE));
        }
        return this.openDatabase().then(function (db) {
            return new Promise(function (resolve, reject) {
                var transaction = db.transaction([FCM_VAPID_OBJ_STORE]);
                var objectStore = transaction.objectStore(FCM_VAPID_OBJ_STORE);
                var scopeRequest = objectStore.get(swScope);
                scopeRequest.onerror = function () {
                    reject(scopeRequest.error);
                };
                scopeRequest.onsuccess = function () {
                    var result = scopeRequest.result;
                    var vapidKey = null;
                    if (result) {
                        vapidKey = result.vapidKey;
                    }
                    resolve(vapidKey);
                };
            });
        });
    };
    /**
     * Save a vapid key against a swScope for later date.
     */
    VapidDetailsModel.prototype.saveVapidDetails = function (swScope, vapidKey) {
        var _this = this;
        if (typeof swScope !== 'string' || swScope.length === 0) {
            return Promise.reject(this.errorFactory_.create(errors_1.default.codes.BAD_SCOPE));
        }
        if (vapidKey === null || vapidKey.length !== UNCOMPRESSED_PUBLIC_KEY_SIZE) {
            return Promise.reject(this.errorFactory_.create(errors_1.default.codes.BAD_VAPID_KEY));
        }
        var details = {
            swScope: swScope,
            vapidKey: vapidKey
        };
        return this.openDatabase().then(function (db) {
            return new Promise(function (resolve, reject) {
                var transaction = db.transaction([FCM_VAPID_OBJ_STORE], _this.TRANSACTION_READ_WRITE);
                var objectStore = transaction.objectStore(FCM_VAPID_OBJ_STORE);
                var request = objectStore.put(details);
                request.onerror = function () {
                    reject(request.error);
                };
                request.onsuccess = function () {
                    resolve();
                };
            });
        });
    };
    /**
     * This method deletes details of the current FCM VAPID key for a SW scope.
     * Resolves once the scope/vapid details have been deleted and returns the
     * deleted vapid key.
     */
    VapidDetailsModel.prototype.deleteVapidDetails = function (swScope) {
        var _this = this;
        return this.getVapidFromSWScope(swScope).then(function (vapidKey) {
            if (!vapidKey) {
                throw _this.errorFactory_.create(errors_1.default.codes.DELETE_SCOPE_NOT_FOUND);
            }
            return _this.openDatabase().then(function (db) {
                return new Promise(function (resolve, reject) {
                    var transaction = db.transaction([FCM_VAPID_OBJ_STORE], _this.TRANSACTION_READ_WRITE);
                    var objectStore = transaction.objectStore(FCM_VAPID_OBJ_STORE);
                    var request = objectStore.delete(swScope);
                    request.onerror = function () {
                        reject(request.error);
                    };
                    request.onsuccess = function () {
                        if (request.result === 0) {
                            reject(_this.errorFactory_.create(errors_1.default.codes.FAILED_DELETE_VAPID_KEY));
                            return;
                        }
                        resolve(vapidKey);
                    };
                });
            });
        });
    };
    return VapidDetailsModel;
}(db_interface_1.default));
exports.default = VapidDetailsModel;

//# sourceMappingURL=vapid-details-model.js.map
