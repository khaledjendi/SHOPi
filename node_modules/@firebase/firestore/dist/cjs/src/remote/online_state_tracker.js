"use strict";
/**
 * Copyright 2018 Google Inc.
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
var types_1 = require("../core/types");
var log = require("../util/log");
var assert_1 = require("../util/assert");
var async_queue_1 = require("../util/async_queue");
var LOG_TAG = 'OnlineStateTracker';
// To deal with transient failures, we allow multiple stream attempts before
// giving up and transitioning from OnlineState.Unknown to Offline.
var MAX_WATCH_STREAM_FAILURES = 2;
// To deal with stream attempts that don't succeed or fail in a timely manner,
// we have a timeout for OnlineState to reach Online or Offline.
// If the timeout is reached, we transition to Offline rather than waiting
// indefinitely.
var ONLINE_STATE_TIMEOUT_MS = 10 * 1000;
/**
 * A component used by the RemoteStore to track the OnlineState (that is,
 * whether or not the client as a whole should be considered to be online or
 * offline), implementing the appropriate heuristics.
 *
 * In particular, when the client is trying to connect to the backend, we
 * allow up to MAX_WATCH_STREAM_FAILURES within ONLINE_STATE_TIMEOUT_MS for
 * a connection to succeed. If we have too many failures or the timeout elapses,
 * then we set the OnlineState to Offline, and the client will behave as if
 * it is offline (get()s will return cached data, etc.).
 */
var OnlineStateTracker = /** @class */ (function () {
    function OnlineStateTracker(asyncQueue, onlineStateHandler) {
        this.asyncQueue = asyncQueue;
        this.onlineStateHandler = onlineStateHandler;
        /** The current OnlineState. */
        this.state = types_1.OnlineState.Unknown;
        /**
         * A count of consecutive failures to open the stream. If it reaches the
         * maximum defined by MAX_WATCH_STREAM_FAILURES, we'll set the OnlineState to
         * Offline.
         */
        this.watchStreamFailures = 0;
        /**
         * A timer that elapses after ONLINE_STATE_TIMEOUT_MS, at which point we
         * transition from OnlineState.Unknown to OnlineState.Offline without waiting
         * for the stream to actually fail (MAX_WATCH_STREAM_FAILURES times).
         */
        this.onlineStateTimer = null;
        /**
         * Whether the client should log a warning message if it fails to connect to
         * the backend (initially true, cleared after a successful stream, or if we've
         * logged the message already).
         */
        this.shouldWarnClientIsOffline = true;
    }
    /**
     * Called by RemoteStore when a watch stream is started (including on each
     * backoff attempt).
     *
     * If this is the first attempt, it sets the OnlineState to Unknown and starts
     * the onlineStateTimer.
     */
    OnlineStateTracker.prototype.handleWatchStreamStart = function () {
        var _this = this;
        if (this.watchStreamFailures === 0) {
            this.setAndBroadcast(types_1.OnlineState.Unknown);
            assert_1.assert(this.onlineStateTimer === null, "onlineStateTimer shouldn't be started yet");
            this.onlineStateTimer = this.asyncQueue.enqueueAfterDelay(async_queue_1.TimerId.OnlineStateTimeout, ONLINE_STATE_TIMEOUT_MS, function () {
                _this.onlineStateTimer = null;
                assert_1.assert(_this.state === types_1.OnlineState.Unknown, 'Timer should be canceled if we transitioned to a different state.');
                log.debug(LOG_TAG, "Watch stream didn't reach online or offline within " +
                    (ONLINE_STATE_TIMEOUT_MS + "ms. Considering client offline."));
                _this.logClientOfflineWarningIfNecessary();
                _this.setAndBroadcast(types_1.OnlineState.Offline);
                // NOTE: handleWatchStreamFailure() will continue to increment
                // watchStreamFailures even though we are already marked Offline,
                // but this is non-harmful.
                return Promise.resolve();
            });
        }
    };
    /**
     * Updates our OnlineState as appropriate after the watch stream reports a
     * failure. The first failure moves us to the 'Unknown' state. We then may
     * allow multiple failures (based on MAX_WATCH_STREAM_FAILURES) before we
     * actually transition to the 'Offline' state.
     */
    OnlineStateTracker.prototype.handleWatchStreamFailure = function () {
        if (this.state === types_1.OnlineState.Online) {
            this.setAndBroadcast(types_1.OnlineState.Unknown);
            // To get to OnlineState.Online, set() must have been called which would
            // have reset our heuristics.
            assert_1.assert(this.watchStreamFailures === 0, 'watchStreamFailures must be 0');
            assert_1.assert(this.onlineStateTimer === null, 'onlineStateTimer must be null');
        }
        else {
            this.watchStreamFailures++;
            if (this.watchStreamFailures >= MAX_WATCH_STREAM_FAILURES) {
                this.clearOnlineStateTimer();
                this.logClientOfflineWarningIfNecessary();
                this.setAndBroadcast(types_1.OnlineState.Offline);
            }
        }
    };
    /**
     * Explicitly sets the OnlineState to the specified state.
     *
     * Note that this resets our timers / failure counters, etc. used by our
     * Offline heuristics, so must not be used in place of
     * handleWatchStreamStart() and handleWatchStreamFailure().
     */
    OnlineStateTracker.prototype.set = function (newState) {
        this.clearOnlineStateTimer();
        this.watchStreamFailures = 0;
        if (newState === types_1.OnlineState.Online) {
            // We've connected to watch at least once. Don't warn the developer
            // about being offline going forward.
            this.shouldWarnClientIsOffline = false;
        }
        this.setAndBroadcast(newState);
    };
    OnlineStateTracker.prototype.setAndBroadcast = function (newState) {
        if (newState !== this.state) {
            this.state = newState;
            this.onlineStateHandler(newState);
        }
    };
    OnlineStateTracker.prototype.logClientOfflineWarningIfNecessary = function () {
        if (this.shouldWarnClientIsOffline) {
            log.error('Could not reach Firestore backend.');
            this.shouldWarnClientIsOffline = false;
        }
    };
    OnlineStateTracker.prototype.clearOnlineStateTimer = function () {
        if (this.onlineStateTimer !== null) {
            this.onlineStateTimer.cancel();
            this.onlineStateTimer = null;
        }
    };
    return OnlineStateTracker;
}());
exports.OnlineStateTracker = OnlineStateTracker;

//# sourceMappingURL=online_state_tracker.js.map
