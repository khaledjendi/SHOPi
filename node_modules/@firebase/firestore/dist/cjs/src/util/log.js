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
/* tslint:disable:no-console */
var version_1 = require("../core/version");
var platform_1 = require("../platform/platform");
var logger_1 = require("@firebase/logger");
var logClient = new logger_1.Logger('@firebase/firestore');
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["ERROR"] = 1] = "ERROR";
    LogLevel[LogLevel["SILENT"] = 2] = "SILENT";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
// Helper methods are needed because variables can't be exported as read/write
function getLogLevel() {
    if (logClient.logLevel === logger_1.LogLevel.DEBUG) {
        return LogLevel.DEBUG;
    }
    else if (logClient.logLevel === logger_1.LogLevel.SILENT) {
        return LogLevel.SILENT;
    }
    else {
        return LogLevel.ERROR;
    }
}
exports.getLogLevel = getLogLevel;
function setLogLevel(newLevel) {
    /**
     * Map the new log level to the associated Firebase Log Level
     */
    switch (newLevel) {
        case LogLevel.DEBUG:
            logClient.logLevel = logger_1.LogLevel.DEBUG;
            break;
        case LogLevel.ERROR:
            logClient.logLevel = logger_1.LogLevel.ERROR;
            break;
        case LogLevel.SILENT:
            logClient.logLevel = logger_1.LogLevel.SILENT;
            break;
        default:
            logClient.error("Firestore (" + version_1.SDK_VERSION + "): Invalid value passed to `setLogLevel`");
    }
}
exports.setLogLevel = setLogLevel;
function debug(tag, msg) {
    var obj = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        obj[_i - 2] = arguments[_i];
    }
    if (logClient.logLevel <= logger_1.LogLevel.DEBUG) {
        var args = obj.map(argToString);
        logClient.debug.apply(logClient, ["Firestore (" + version_1.SDK_VERSION + ") [" + tag + "]: " + msg].concat(args));
    }
}
exports.debug = debug;
function error(msg) {
    var obj = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        obj[_i - 1] = arguments[_i];
    }
    if (logClient.logLevel <= logger_1.LogLevel.ERROR) {
        var args = obj.map(argToString);
        logClient.error.apply(logClient, ["Firestore (" + version_1.SDK_VERSION + "): " + msg].concat(args));
    }
}
exports.error = error;
/**
 * Converts an additional log parameter to a string representation.
 */
function argToString(obj) {
    if (typeof obj === 'string') {
        return obj;
    }
    else {
        var platform = platform_1.PlatformSupport.getPlatform();
        try {
            return platform.formatJSON(obj);
        }
        catch (e) {
            // Converting to JSON failed, just log the object directly
            return obj;
        }
    }
}

//# sourceMappingURL=log.js.map
