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
var array_buffer_to_base64_1 = require("../helpers/array-buffer-to-base64");
var clean_v1_undefined_1 = require("./clean-v1-undefined");
var FCM_TOKEN_OBJ_STORE = 'fcm_token_object_Store';
var DB_NAME = 'fcm_token_details_db';
var DB_VERSION = 2;
/** @record */
function ValidateInput() { }
/** @type {string|undefined} */
ValidateInput.prototype.fcmToken;
/** @type {string|undefined} */
ValidateInput.prototype.swScope;
/** @type {string|undefined} */
ValidateInput.prototype.vapidKey;
/** @type {PushSubscription|undefined} */
ValidateInput.prototype.subscription;
/** @type {string|undefined} */
ValidateInput.prototype.fcmSenderId;
/** @type {string|undefined} */
ValidateInput.prototype.fcmPushSet;
var TokenDetailsModel = /** @class */ (function (_super) {
    tslib_1.__extends(TokenDetailsModel, _super);
    function TokenDetailsModel() {
        return _super.call(this, DB_NAME, DB_VERSION) || this;
    }
    TokenDetailsModel.prototype.onDBUpgrade = function (db, evt) {
        if (evt.oldVersion < 1) {
            // New IDB instance
            var objectStore = db.createObjectStore(FCM_TOKEN_OBJ_STORE, {
                keyPath: 'swScope'
            });
            // Make sure the sender ID can be searched
            objectStore.createIndex('fcmSenderId', 'fcmSenderId', {
                unique: false
            });
            objectStore.createIndex('fcmToken', 'fcmToken', {
                unique: true
            });
        }
        if (evt.oldVersion < 2) {
            // Prior to version 2, we were using either 'fcm_token_details_db'
            // or 'undefined' as the database name due to bug in the SDK
            // So remove the old tokens and databases.
            clean_v1_undefined_1.cleanV1();
        }
    };
    /**
     * This method takes an object and will check for known arguments and
     * validate the input.
     * @private
     * @param {!ValidateInput} input
     * @return {!Promise} Returns promise that resolves if input is valid,
     * rejects otherwise.
     */
    TokenDetailsModel.prototype.validateInputs_ = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (input.fcmToken) {
                    if (typeof input.fcmToken !== 'string' || input.fcmToken.length === 0) {
                        return [2 /*return*/, Promise.reject(this.errorFactory_.create(errors_1.default.codes.BAD_TOKEN))];
                    }
                }
                if (input.swScope) {
                    if (typeof input.swScope !== 'string' || input.swScope.length === 0) {
                        return [2 /*return*/, Promise.reject(this.errorFactory_.create(errors_1.default.codes.BAD_SCOPE))];
                    }
                }
                if (input.vapidKey) {
                    if (!(input.vapidKey instanceof Uint8Array) ||
                        input.vapidKey.length !== 65) {
                        return [2 /*return*/, Promise.reject(this.errorFactory_.create(errors_1.default.codes.BAD_VAPID_KEY))];
                    }
                }
                if (input.subscription) {
                    if (!(input.subscription instanceof PushSubscription)) {
                        return [2 /*return*/, Promise.reject(this.errorFactory_.create(errors_1.default.codes.BAD_SUBSCRIPTION))];
                    }
                }
                if (input.fcmSenderId) {
                    if (typeof input.fcmSenderId !== 'string' ||
                        input.fcmSenderId.length === 0) {
                        return [2 /*return*/, Promise.reject(this.errorFactory_.create(errors_1.default.codes.BAD_SENDER_ID))];
                    }
                }
                if (input.fcmPushSet) {
                    if (typeof input.fcmPushSet !== 'string' ||
                        input.fcmPushSet.length === 0) {
                        return [2 /*return*/, Promise.reject(this.errorFactory_.create(errors_1.default.codes.BAD_PUSH_SET))];
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Given a token, this method will look up the details in indexedDB.
     * @param {string} fcmToken
     * @return {Promise<Object>} The details associated with that token.
     */
    TokenDetailsModel.prototype.getTokenDetailsFromToken = function (fcmToken) {
        var _this = this;
        if (!fcmToken) {
            return Promise.reject(this.errorFactory_.create(errors_1.default.codes.BAD_TOKEN));
        }
        return this.validateInputs_({ fcmToken: fcmToken })
            .then(function () {
            return _this.openDatabase();
        })
            .then(function (db) {
            return new Promise(function (resolve, reject) {
                var transaction = db.transaction([FCM_TOKEN_OBJ_STORE]);
                var objectStore = transaction.objectStore(FCM_TOKEN_OBJ_STORE);
                var index = objectStore.index('fcmToken');
                var request = index.get(fcmToken);
                request.onerror = function (event) {
                    reject(event.target.error);
                };
                request.onsuccess = function (event) {
                    var result = event.target.result
                        ? event.target.result
                        : null;
                    resolve(result);
                };
            });
        });
    };
    /**
     * Given a service worker scope, this method will look up the details in
     * indexedDB.
     * @public
     * @param {string} swScope
     * @return {Promise<Object>} The details associated with that token.
     */
    TokenDetailsModel.prototype.getTokenDetailsFromSWScope = function (swScope) {
        var _this = this;
        if (!swScope) {
            return Promise.reject(this.errorFactory_.create(errors_1.default.codes.BAD_SCOPE));
        }
        return this.validateInputs_({ swScope: swScope })
            .then(function () {
            return _this.openDatabase();
        })
            .then(function (db) {
            return new Promise(function (resolve, reject) {
                var transaction = db.transaction([FCM_TOKEN_OBJ_STORE]);
                var objectStore = transaction.objectStore(FCM_TOKEN_OBJ_STORE);
                var scopeRequest = objectStore.get(swScope);
                scopeRequest.onerror = function (event) {
                    reject(event.target.error);
                };
                scopeRequest.onsuccess = function (event) {
                    var result = event.target.result
                        ? event.target.result
                        : null;
                    resolve(result);
                };
            });
        });
    };
    /**
     * Save the details for the fcm token for re-use at a later date.
     * @param {{swScope: !string, vapidKey: !string,
     * subscription: !PushSubscription, fcmSenderId: !string, fcmToken: !string,
     * fcmPushSet: !string}} input A plain js object containing args to save.
     * @return {Promise<void>}
     */
    TokenDetailsModel.prototype.saveTokenDetails = function (_a) {
        var _this = this;
        var swScope = _a.swScope, vapidKey = _a.vapidKey, subscription = _a.subscription, fcmSenderId = _a.fcmSenderId, fcmToken = _a.fcmToken, fcmPushSet = _a.fcmPushSet;
        if (!swScope) {
            return Promise.reject(this.errorFactory_.create(errors_1.default.codes.BAD_SCOPE));
        }
        if (!vapidKey) {
            return Promise.reject(this.errorFactory_.create(errors_1.default.codes.BAD_VAPID_KEY));
        }
        if (!subscription) {
            return Promise.reject(this.errorFactory_.create(errors_1.default.codes.BAD_SUBSCRIPTION));
        }
        if (!fcmSenderId) {
            return Promise.reject(this.errorFactory_.create(errors_1.default.codes.BAD_SENDER_ID));
        }
        if (!fcmToken) {
            return Promise.reject(this.errorFactory_.create(errors_1.default.codes.BAD_TOKEN));
        }
        if (!fcmPushSet) {
            return Promise.reject(this.errorFactory_.create(errors_1.default.codes.BAD_PUSH_SET));
        }
        return this.validateInputs_({
            swScope: swScope,
            vapidKey: vapidKey,
            subscription: subscription,
            fcmSenderId: fcmSenderId,
            fcmToken: fcmToken,
            fcmPushSet: fcmPushSet
        })
            .then(function () {
            return _this.openDatabase();
        })
            .then(function (db) {
            /**
             * @dict
             */
            var details = {
                swScope: swScope,
                vapidKey: array_buffer_to_base64_1.default(vapidKey),
                endpoint: subscription.endpoint,
                auth: array_buffer_to_base64_1.default(subscription['getKey']('auth')),
                p256dh: array_buffer_to_base64_1.default(subscription['getKey']('p256dh')),
                fcmSenderId: fcmSenderId,
                fcmToken: fcmToken,
                fcmPushSet: fcmPushSet,
                createTime: Date.now()
            };
            return new Promise(function (resolve, reject) {
                var transaction = db.transaction([FCM_TOKEN_OBJ_STORE], _this.TRANSACTION_READ_WRITE);
                var objectStore = transaction.objectStore(FCM_TOKEN_OBJ_STORE);
                var request = objectStore.put(details);
                request.onerror = function (event) {
                    reject(event.target.error);
                };
                request.onsuccess = function (event) {
                    resolve();
                };
            });
        });
    };
    /**
     * This method deletes details of the current FCM token.
     * It's returning a promise in case we need to move to an async
     * method for deleting at a later date.
     * @return {Promise<Object>} Resolves once the FCM token details have been
     * deleted and returns the deleted details.
     */
    TokenDetailsModel.prototype.deleteToken = function (token) {
        var _this = this;
        if (typeof token !== 'string' || token.length === 0) {
            return Promise.reject(this.errorFactory_.create(errors_1.default.codes.INVALID_DELETE_TOKEN));
        }
        return this.getTokenDetailsFromToken(token).then(function (details) {
            if (!details) {
                throw _this.errorFactory_.create(errors_1.default.codes.DELETE_TOKEN_NOT_FOUND);
            }
            return _this.openDatabase().then(function (db) {
                return new Promise(function (resolve, reject) {
                    var transaction = db.transaction([FCM_TOKEN_OBJ_STORE], _this.TRANSACTION_READ_WRITE);
                    var objectStore = transaction.objectStore(FCM_TOKEN_OBJ_STORE);
                    var request = objectStore.delete(details['swScope']);
                    request.onerror = function (event) {
                        reject(event.target.error);
                    };
                    request.onsuccess = function (event) {
                        if (event.target.result === 0) {
                            reject(_this.errorFactory_.create(errors_1.default.codes.FAILED_TO_DELETE_TOKEN));
                            return;
                        }
                        resolve(details);
                    };
                });
            });
        });
    };
    return TokenDetailsModel;
}(db_interface_1.default));
exports.default = TokenDetailsModel;

//# sourceMappingURL=token-details-model.js.map
