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
var util_1 = require("@firebase/util");
var errors_1 = require("../models/errors");
var token_details_model_1 = require("../models/token-details-model");
var vapid_details_model_1 = require("../models/vapid-details-model");
var notification_permission_1 = require("../models/notification-permission");
var iid_model_1 = require("../models/iid-model");
var array_buffer_to_base64_1 = require("../helpers/array-buffer-to-base64");
var SENDER_ID_OPTION_NAME = 'messagingSenderId';
// Database cache should be invalidated once a week.
exports.TOKEN_EXPIRATION_MILLIS = 7 * 24 * 60 * 60 * 1000; // 7 days
var ControllerInterface = /** @class */ (function () {
    /**
     * An interface of the Messaging Service API
     * @param {!firebase.app.App} app
     */
    function ControllerInterface(app) {
        var _this = this;
        this.errorFactory_ = new util_1.ErrorFactory('messaging', 'Messaging', errors_1.default.map);
        if (!app.options[SENDER_ID_OPTION_NAME] ||
            typeof app.options[SENDER_ID_OPTION_NAME] !== 'string') {
            throw this.errorFactory_.create(errors_1.default.codes.BAD_SENDER_ID);
        }
        this.messagingSenderId_ = app.options[SENDER_ID_OPTION_NAME];
        this.tokenDetailsModel_ = new token_details_model_1.default();
        this.vapidDetailsModel_ = new vapid_details_model_1.default();
        this.iidModel_ = new iid_model_1.default();
        this.app = app;
        this.INTERNAL = {};
        this.INTERNAL.delete = function () { return _this.delete(); };
    }
    /**
     * @export
     */
    ControllerInterface.prototype.getToken = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var currentPermission, swReg, publicVapidKey, pushSubscription, tokenDetails;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentPermission = this.getNotificationPermission_();
                        if (currentPermission !== notification_permission_1.default.granted) {
                            if (currentPermission === notification_permission_1.default.denied) {
                                return [2 /*return*/, Promise.reject(this.errorFactory_.create(errors_1.default.codes.NOTIFICATIONS_BLOCKED))];
                            }
                            // We must wait for permission to be granted
                            return [2 /*return*/, Promise.resolve(null)];
                        }
                        return [4 /*yield*/, this.getSWRegistration_()];
                    case 1:
                        swReg = _a.sent();
                        return [4 /*yield*/, this.getPublicVapidKey_()];
                    case 2:
                        publicVapidKey = _a.sent();
                        return [4 /*yield*/, this.getPushSubscription(swReg, publicVapidKey)];
                    case 3:
                        pushSubscription = _a.sent();
                        return [4 /*yield*/, this.tokenDetailsModel_.getTokenDetailsFromSWScope(swReg.scope)];
                    case 4:
                        tokenDetails = _a.sent();
                        if (tokenDetails) {
                            return [2 /*return*/, this.manageExistingToken(swReg, pushSubscription, publicVapidKey, tokenDetails)];
                        }
                        return [2 /*return*/, this.getNewToken(swReg, pushSubscription, publicVapidKey)];
                }
            });
        });
    };
    /**
     * manageExistingToken is triggered if there's an existing FCM token in the
     * database and it can take 3 different actions:
     * 1) Retrieve the existing FCM token from the database.
     * 2) If VAPID details have changed: Delete the existing token and create a
     * new one with the new VAPID key.
     * 3) If the database cache is invalidated: Send a request to FCM to update
     * the token, and to check if the token is still valid on FCM-side.
     */
    ControllerInterface.prototype.manageExistingToken = function (swReg, pushSubscription, publicVapidKey, tokenDetails) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var isTokenValid, now;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isTokenValid = this.isTokenStillValid(pushSubscription, publicVapidKey, tokenDetails);
                        if (isTokenValid) {
                            now = Date.now();
                            if (now < tokenDetails['createTime'] + exports.TOKEN_EXPIRATION_MILLIS) {
                                return [2 /*return*/, tokenDetails['fcmToken']];
                            }
                            else {
                                return [2 /*return*/, this.updateToken(swReg, pushSubscription, publicVapidKey, tokenDetails)];
                            }
                        }
                        // If the token is no longer valid (for example if the VAPID details
                        // have changed), delete the existing token, and create a new one.
                        return [4 /*yield*/, this.deleteToken(tokenDetails['fcmToken'])];
                    case 1:
                        // If the token is no longer valid (for example if the VAPID details
                        // have changed), delete the existing token, and create a new one.
                        _a.sent();
                        return [2 /*return*/, this.getNewToken(swReg, pushSubscription, publicVapidKey)];
                }
            });
        });
    };
    /*
     * Checks if the tokenDetails match the details provided in the clients.
     */
    ControllerInterface.prototype.isTokenStillValid = function (pushSubscription, publicVapidKey, tokenDetails) {
        if (array_buffer_to_base64_1.default(publicVapidKey) !== tokenDetails['vapidKey']) {
            return false;
        }
        // getKey() isn't defined in the PushSubscription externs file, hence
        // subscription['getKey']('<key name>').
        return (pushSubscription.endpoint === tokenDetails['endpoint'] &&
            array_buffer_to_base64_1.default(pushSubscription['getKey']('auth')) ===
                tokenDetails['auth'] &&
            array_buffer_to_base64_1.default(pushSubscription['getKey']('p256dh')) ===
                tokenDetails['p256dh']);
    };
    ControllerInterface.prototype.updateToken = function (swReg, pushSubscription, publicVapidKey, tokenDetails) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var updatedToken, allDetails, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 6]);
                        return [4 /*yield*/, this.iidModel_.updateToken(this.messagingSenderId_, tokenDetails['fcmToken'], tokenDetails['fcmPushSet'], pushSubscription, publicVapidKey)];
                    case 1:
                        updatedToken = _a.sent();
                        allDetails = {
                            swScope: swReg.scope,
                            vapidKey: publicVapidKey,
                            subscription: pushSubscription,
                            fcmSenderId: this.messagingSenderId_,
                            fcmToken: updatedToken,
                            fcmPushSet: tokenDetails['fcmPushSet']
                        };
                        return [4 /*yield*/, this.tokenDetailsModel_.saveTokenDetails(allDetails)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.vapidDetailsModel_.saveVapidDetails(swReg.scope, publicVapidKey)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, updatedToken];
                    case 4:
                        e_1 = _a.sent();
                        return [4 /*yield*/, this.deleteToken(tokenDetails['fcmToken'])];
                    case 5:
                        _a.sent();
                        throw e_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ControllerInterface.prototype.getNewToken = function (swReg, pushSubscription, publicVapidKey) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tokenDetails, allDetails;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.iidModel_.getToken(this.messagingSenderId_, pushSubscription, publicVapidKey)];
                    case 1:
                        tokenDetails = _a.sent();
                        allDetails = {
                            swScope: swReg.scope,
                            vapidKey: publicVapidKey,
                            subscription: pushSubscription,
                            fcmSenderId: this.messagingSenderId_,
                            fcmToken: tokenDetails['token'],
                            fcmPushSet: tokenDetails['pushSet']
                        };
                        return [4 /*yield*/, this.tokenDetailsModel_.saveTokenDetails(allDetails)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.vapidDetailsModel_.saveVapidDetails(swReg.scope, publicVapidKey)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, tokenDetails['token']];
                }
            });
        });
    };
    /**
     * This method deletes tokens that the token manager looks after,
     * unsubscribes the token from FCM  and then unregisters the push
     * subscription if it exists. It returns a promise that indicates
     * whether or not the unsubscribe request was processed successfully.
     * @export
     */
    ControllerInterface.prototype.deleteToken = function (token) {
        var _this = this;
        return this.tokenDetailsModel_
            .deleteToken(token)
            .then(function (details) {
            return _this.iidModel_.deleteToken(details['fcmSenderId'], details['fcmToken'], details['fcmPushSet']);
        })
            .then(function () {
            return _this.getSWRegistration_()
                .then(function (registration) {
                if (registration) {
                    return registration.pushManager.getSubscription();
                }
            })
                .then(function (subscription) {
                if (subscription) {
                    return subscription.unsubscribe();
                }
            });
        });
    };
    ControllerInterface.prototype.getSWRegistration_ = function () {
        throw this.errorFactory_.create(errors_1.default.codes.SHOULD_BE_INHERITED);
    };
    ControllerInterface.prototype.getPublicVapidKey_ = function () {
        throw this.errorFactory_.create(errors_1.default.codes.SHOULD_BE_INHERITED);
    };
    //
    // The following methods should only be available in the window.
    //
    ControllerInterface.prototype.requestPermission = function () {
        throw this.errorFactory_.create(errors_1.default.codes.AVAILABLE_IN_WINDOW);
    };
    /**
     * Gets a PushSubscription for the current user.
     */
    ControllerInterface.prototype.getPushSubscription = function (swRegistration, publicVapidKey) {
        return swRegistration.pushManager.getSubscription().then(function (subscription) {
            if (subscription) {
                return subscription;
            }
            return swRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: publicVapidKey
            });
        });
    };
    /**
     * @export
     * @param {!ServiceWorkerRegistration} registration
     */
    ControllerInterface.prototype.useServiceWorker = function (registration) {
        throw this.errorFactory_.create(errors_1.default.codes.AVAILABLE_IN_WINDOW);
    };
    /**
     * @export
     * @param {!string} b64PublicKey
     */
    ControllerInterface.prototype.usePublicVapidKey = function (b64PublicKey) {
        throw this.errorFactory_.create(errors_1.default.codes.AVAILABLE_IN_WINDOW);
    };
    /**
     * @export
     * @param {!firebase.Observer|function(*)} nextOrObserver
     * @param {function(!Error)=} optError
     * @param {function()=} optCompleted
     * @return {!function()}
     */
    ControllerInterface.prototype.onMessage = function (nextOrObserver, optError, optCompleted) {
        throw this.errorFactory_.create(errors_1.default.codes.AVAILABLE_IN_WINDOW);
    };
    /**
     * @export
     * @param {!firebase.Observer|function()} nextOrObserver An observer object
     * or a function triggered on token refresh.
     * @param {function(!Error)=} optError Optional A function
     * triggered on token refresh error.
     * @param {function()=} optCompleted Optional function triggered when the
     * observer is removed.
     * @return {!function()} The unsubscribe function for the observer.
     */
    ControllerInterface.prototype.onTokenRefresh = function (nextOrObserver, optError, optCompleted) {
        throw this.errorFactory_.create(errors_1.default.codes.AVAILABLE_IN_WINDOW);
    };
    //
    // The following methods are used by the service worker only.
    //
    /**
     * @export
     * @param {function(Object)} callback
     */
    ControllerInterface.prototype.setBackgroundMessageHandler = function (callback) {
        throw this.errorFactory_.create(errors_1.default.codes.AVAILABLE_IN_SW);
    };
    //
    // The following methods are used by the service themselves and not exposed
    // publicly or not expected to be used by developers.
    //
    /**
     * This method is required to adhere to the Firebase interface.
     * It closes any currently open indexdb database connections.
     */
    ControllerInterface.prototype.delete = function () {
        return Promise.all([
            this.tokenDetailsModel_.closeDatabase(),
            this.vapidDetailsModel_.closeDatabase()
        ]);
    };
    /**
     * Returns the current Notification Permission state.
     * @private
     * @return {string} The currenct permission state.
     */
    ControllerInterface.prototype.getNotificationPermission_ = function () {
        return Notification.permission;
    };
    ControllerInterface.prototype.getTokenDetailsModel = function () {
        return this.tokenDetailsModel_;
    };
    ControllerInterface.prototype.getVapidDetailsModel = function () {
        return this.vapidDetailsModel_;
    };
    /**
     * @protected
     * @returns {IIDModel}
     */
    ControllerInterface.prototype.getIIDModel = function () {
        return this.iidModel_;
    };
    return ControllerInterface;
}());
exports.default = ControllerInterface;

//# sourceMappingURL=controller-interface.js.map
