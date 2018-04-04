"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * There seems to have been a bug in the messaging SDK versions <= 4.9.x
 * where the IndexedDB model was using a database name of 'undefined'.
 *
 * In 4.10.x we changed the model implementation, but kept the database
 * name as it should have been. This however introduced an issue where
 * two tokens were pointing to the same underlying PushSubscription.
 *
 * This code will look for the undefined database and delete any of the
 * underlying tokens.
 */
var iid_model_1 = require("../models/iid-model");
var OLD_DB_NAME = 'undefined';
var OLD_OBJECT_STORE_NAME = 'fcm_token_object_Store';
function handleDb(db) {
    if (!db.objectStoreNames.contains(OLD_OBJECT_STORE_NAME)) {
        // We found a database with the name 'undefined', but our expected object
        // store isn't defined.
        return;
    }
    var transaction = db.transaction(OLD_OBJECT_STORE_NAME);
    var objectStore = transaction.objectStore(OLD_OBJECT_STORE_NAME);
    var iidModel = new iid_model_1.default();
    var openCursorRequest = objectStore.openCursor();
    openCursorRequest.onerror = function (event) {
        // NOOP - Nothing we can do.
        console.warn('Unable to cleanup old IDB.', event);
    };
    openCursorRequest.onsuccess = function () {
        var cursor = openCursorRequest.result;
        if (cursor) {
            // cursor.value contains the current record being iterated through
            // this is where you'd do something with the result
            var tokenDetails = cursor.value;
            iidModel.deleteToken(tokenDetails.fcmSenderId, tokenDetails.fcmToken, tokenDetails.fcmPushSet);
            cursor.continue();
        }
        else {
            db.close();
            indexedDB.deleteDatabase(OLD_DB_NAME);
        }
    };
}
function cleanV1() {
    var request = indexedDB.open(OLD_DB_NAME);
    request.onerror = function (event) {
        // NOOP - Nothing we can do.
    };
    request.onsuccess = function (event) {
        var db = request.result;
        handleDb(db);
    };
}
exports.cleanV1 = cleanV1;

//# sourceMappingURL=clean-v1-undefined.js.map
