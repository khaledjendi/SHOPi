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
var util_1 = require("@firebase/util");
var errors_1 = require("./errors");
var array_buffer_to_base64_1 = require("../helpers/array-buffer-to-base64");
var fcm_details_1 = require("./fcm-details");
var IIDModel = /** @class */ (function () {
    function IIDModel() {
        this.errorFactory_ = new util_1.ErrorFactory('messaging', 'Messaging', errors_1.default.map);
    }
    /**
     * Given a PushSubscription and messagingSenderId, get an FCM token.
     * @public
     * @param  {string} senderId The 'messagingSenderId' to tie the token to.
     * @param  {PushSubscription} subscription The PushSusbcription to "federate".
     * @param  {Uint8Array} publicVapidKey The public VAPID key.
     * @return {Promise<!Object>} Returns the FCM token to be used in place
     * of the PushSubscription.
     */
    IIDModel.prototype.getToken = function (senderId, subscription, publicVapidKey) {
        var _this = this;
        var p256dh = array_buffer_to_base64_1.default(subscription['getKey']('p256dh'));
        var auth = array_buffer_to_base64_1.default(subscription['getKey']('auth'));
        var fcmSubscribeBody = "authorized_entity=" + senderId + "&" +
            ("endpoint=" + subscription.endpoint + "&") +
            ("encryption_key=" + p256dh + "&") +
            ("encryption_auth=" + auth);
        if (publicVapidKey !== fcm_details_1.default.DEFAULT_PUBLIC_VAPID_KEY) {
            var applicationPubKey = array_buffer_to_base64_1.default(publicVapidKey);
            fcmSubscribeBody += "&application_pub_key=" + applicationPubKey;
        }
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var subscribeOptions = {
            method: 'POST',
            headers: headers,
            body: fcmSubscribeBody
        };
        return fetch(fcm_details_1.default.ENDPOINT + '/fcm/connect/subscribe', subscribeOptions)
            .then(function (response) { return response.json(); })
            .catch(function () {
            throw _this.errorFactory_.create(errors_1.default.codes.TOKEN_SUBSCRIBE_FAILED);
        })
            .then(function (response) {
            var fcmTokenResponse = response;
            if (fcmTokenResponse['error']) {
                var message = fcmTokenResponse['error']['message'];
                throw _this.errorFactory_.create(errors_1.default.codes.TOKEN_SUBSCRIBE_FAILED, {
                    message: message
                });
            }
            if (!fcmTokenResponse['token']) {
                throw _this.errorFactory_.create(errors_1.default.codes.TOKEN_SUBSCRIBE_NO_TOKEN);
            }
            if (!fcmTokenResponse['pushSet']) {
                throw _this.errorFactory_.create(errors_1.default.codes.TOKEN_SUBSCRIBE_NO_PUSH_SET);
            }
            return {
                token: fcmTokenResponse['token'],
                pushSet: fcmTokenResponse['pushSet']
            };
        });
    };
    /**
     * Update the underlying token details for fcmToken.
     */
    IIDModel.prototype.updateToken = function (senderId, fcmToken, fcmPushSet, subscription, publicVapidKey) {
        var _this = this;
        var p256dh = array_buffer_to_base64_1.default(subscription['getKey']('p256dh'));
        var auth = array_buffer_to_base64_1.default(subscription['getKey']('auth'));
        var fcmUpdateBody = "push_set=" + fcmPushSet + "&" +
            ("token=" + fcmToken + "&") +
            ("authorized_entity=" + senderId + "&") +
            ("endpoint=" + subscription.endpoint + "&") +
            ("encryption_key=" + p256dh + "&") +
            ("encryption_auth=" + auth);
        if (publicVapidKey !== fcm_details_1.default.DEFAULT_PUBLIC_VAPID_KEY) {
            var applicationPubKey = array_buffer_to_base64_1.default(publicVapidKey);
            fcmUpdateBody += "&application_pub_key=" + applicationPubKey;
        }
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var updateOptions = {
            method: 'POST',
            headers: headers,
            body: fcmUpdateBody
        };
        var updateFetchRes;
        return fetch(fcm_details_1.default.ENDPOINT + '/fcm/connect/subscribe', updateOptions)
            .then(function (fetchResponse) {
            updateFetchRes = fetchResponse;
            return fetchResponse.json();
        })
            .catch(function () {
            throw _this.errorFactory_.create(errors_1.default.codes.TOKEN_UPDATE_FAILED);
        })
            .then(function (fcmTokenResponse) {
            if (!updateFetchRes.ok) {
                var message = fcmTokenResponse['error']['message'];
                throw _this.errorFactory_.create(errors_1.default.codes.TOKEN_UPDATE_FAILED, {
                    message: message
                });
            }
            if (!fcmTokenResponse['token']) {
                throw _this.errorFactory_.create(errors_1.default.codes.TOKEN_UPDATE_NO_TOKEN);
            }
            return fcmTokenResponse['token'];
        });
    };
    /**
     * Given a fcmToken, pushSet and messagingSenderId, delete an FCM token.
     */
    IIDModel.prototype.deleteToken = function (senderId, fcmToken, fcmPushSet) {
        var _this = this;
        var fcmUnsubscribeBody = "authorized_entity=" + senderId + "&" +
            ("token=" + fcmToken + "&") +
            ("pushSet=" + fcmPushSet);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var unsubscribeOptions = {
            method: 'POST',
            headers: headers,
            body: fcmUnsubscribeBody
        };
        return fetch(fcm_details_1.default.ENDPOINT + '/fcm/connect/unsubscribe', unsubscribeOptions).then(function (fetchResponse) {
            if (!fetchResponse.ok) {
                return fetchResponse.json().then(function (fcmTokenResponse) {
                    if (fcmTokenResponse['error']) {
                        var message = fcmTokenResponse['error']['message'];
                        throw _this.errorFactory_.create(errors_1.default.codes.TOKEN_UNSUBSCRIBE_FAILED, {
                            message: message
                        });
                    }
                }, function (err) {
                    throw _this.errorFactory_.create(errors_1.default.codes.TOKEN_UNSUBSCRIBE_FAILED);
                });
            }
        });
    };
    return IIDModel;
}());
exports.default = IIDModel;

//# sourceMappingURL=iid-model.js.map
