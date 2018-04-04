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
import { assert, fail } from './assert';
import * as log from './log';
import { Deferred } from './promise';
import { Code, FirestoreError } from './error';
/**
 * Wellknown "timer" IDs used when scheduling delayed operations on the
 * AsyncQueue. These IDs can then be used from tests to check for the presence
 * of operations or to run them early.
 *
 * The string values are used when encoding these timer IDs in JSON spec tests.
 */
export var TimerId;
(function (TimerId) {
    /** All can be used with runDelayedOperationsEarly() to run all timers. */
    TimerId["All"] = "all";
    /**
     * The following 4 timers are used in persistent_stream.ts for the listen and
     * write streams. The "Idle" timer is used to close the stream due to
     * inactivity. The "ConnectionBackoff" timer is used to restart a stream once
     * the appropriate backoff delay has elapsed.
     */
    TimerId["ListenStreamIdle"] = "listen_stream_idle";
    TimerId["ListenStreamConnectionBackoff"] = "listen_stream_connection_backoff";
    TimerId["WriteStreamIdle"] = "write_stream_idle";
    TimerId["WriteStreamConnectionBackoff"] = "write_stream_connection_backoff";
    /**
     * A timer used in online_state_tracker.ts to transition from
     * OnlineState.Unknown to Offline after a set timeout, rather than waiting
     * indefinitely for success or failure.
     */
    TimerId["OnlineStateTimeout"] = "online_state_timeout";
})(TimerId || (TimerId = {}));
/**
 * Represents an operation scheduled to be run in the future on an AsyncQueue.
 *
 * It is created via DelayedOperation.createAndSchedule().
 *
 * Supports cancellation (via cancel()) and early execution (via skipDelay()).
 */
var DelayedOperation = /** @class */ (function () {
    function DelayedOperation(asyncQueue, timerId, targetTimeMs, op, removalCallback) {
        this.asyncQueue = asyncQueue;
        this.timerId = timerId;
        this.targetTimeMs = targetTimeMs;
        this.op = op;
        this.removalCallback = removalCallback;
        this.deferred = new Deferred();
        this.then = this.deferred.promise.then.bind(this.deferred.promise);
        this.catch = this.deferred.promise.catch.bind(this.deferred.promise);
        // It's normal for the deferred promise to be canceled (due to cancellation)
        // and so we attach a dummy catch callback to avoid
        // 'UnhandledPromiseRejectionWarning' log spam.
        this.deferred.promise.catch(function (err) { });
    }
    /**
     * Creates and returns a DelayedOperation that has been scheduled to be
     * executed on the provided asyncQueue after the provided delayMs.
     *
     * @param asyncQueue The queue to schedule the operation on.
     * @param id A Timer ID identifying the type of operation this is.
     * @param delayMs The delay (ms) before the operation should be scheduled.
     * @param op The operation to run.
     * @param removalCallback A callback to be called synchronously once the
     *   operation is executed or canceled, notifying the AsyncQueue to remove it
     *   from its delayedOperations list.
     *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
     *   the DelayedOperation class public.
     */
    DelayedOperation.createAndSchedule = function (asyncQueue, timerId, delayMs, op, removalCallback) {
        var targetTime = Date.now() + delayMs;
        var delayedOp = new DelayedOperation(asyncQueue, timerId, targetTime, op, removalCallback);
        delayedOp.start(delayMs);
        return delayedOp;
    };
    /**
     * Starts the timer. This is called immediately after construction by
     * createAndSchedule().
     */
    DelayedOperation.prototype.start = function (delayMs) {
        var _this = this;
        this.timerHandle = setTimeout(function () { return _this.handleDelayElapsed(); }, delayMs);
    };
    /**
     * Queues the operation to run immediately (if it hasn't already been run or
     * canceled).
     */
    DelayedOperation.prototype.skipDelay = function () {
        return this.handleDelayElapsed();
    };
    /**
     * Cancels the operation if it hasn't already been executed or canceled. The
     * promise will be rejected.
     *
     * As long as the operation has not yet been run, calling cancel() provides a
     * guarantee that the operation will not be run.
     */
    DelayedOperation.prototype.cancel = function (reason) {
        if (this.timerHandle !== null) {
            this.clearTimeout();
            this.deferred.reject(new FirestoreError(Code.CANCELLED, 'Operation cancelled' + (reason ? ': ' + reason : '')));
        }
    };
    DelayedOperation.prototype.handleDelayElapsed = function () {
        var _this = this;
        this.asyncQueue.enqueue(function () {
            if (_this.timerHandle !== null) {
                _this.clearTimeout();
                return _this.op().then(function (result) {
                    return _this.deferred.resolve(result);
                });
            }
            else {
                return Promise.resolve();
            }
        });
    };
    DelayedOperation.prototype.clearTimeout = function () {
        if (this.timerHandle !== null) {
            this.removalCallback(this);
            clearTimeout(this.timerHandle);
            this.timerHandle = null;
        }
    };
    return DelayedOperation;
}());
var AsyncQueue = /** @class */ (function () {
    function AsyncQueue() {
        // The last promise in the queue.
        this.tail = Promise.resolve();
        // Operations scheduled to be queued in the future. Operations are
        // automatically removed after they are run or canceled.
        this.delayedOperations = [];
        // Flag set while there's an outstanding AsyncQueue operation, used for
        // assertion sanity-checks.
        this.operationInProgress = false;
    }
    /**
     * Adds a new operation to the queue. Returns a promise that will be resolved
     * when the promise returned by the new operation is (with its value).
     */
    AsyncQueue.prototype.enqueue = function (op) {
        var _this = this;
        this.verifyNotFailed();
        var newTail = this.tail.then(function () {
            _this.operationInProgress = true;
            return op()
                .catch(function (error) {
                _this.failure = error;
                _this.operationInProgress = false;
                var message = error.stack || error.message || '';
                log.error('INTERNAL UNHANDLED ERROR: ', message);
                // Escape the promise chain and throw the error globally so that
                // e.g. any global crash reporting library detects and reports it.
                // (but not for simulated errors in our tests since this breaks mocha)
                if (message.indexOf('Firestore Test Simulated Error') < 0) {
                    setTimeout(function () {
                        throw error;
                    }, 0);
                }
                // Re-throw the error so that this.tail becomes a rejected Promise and
                // all further attempts to chain (via .then) will just short-circuit
                // and return the rejected Promise.
                throw error;
            })
                .then(function (result) {
                _this.operationInProgress = false;
                return result;
            });
        });
        this.tail = newTail;
        return newTail;
    };
    /**
     * Schedules an operation to be queued on the AsyncQueue once the specified
     * `delayMs` has elapsed. The returned CancelablePromise can be used to cancel
     * the operation prior to its running.
     */
    AsyncQueue.prototype.enqueueAfterDelay = function (timerId, delayMs, op) {
        var _this = this;
        this.verifyNotFailed();
        // While not necessarily harmful, we currently don't expect to have multiple
        // ops with the same timer id in the queue, so defensively reject them.
        assert(!this.containsDelayedOperation(timerId), "Attempted to schedule multiple operations with timer id " + timerId + ".");
        var delayedOp = DelayedOperation.createAndSchedule(this, timerId, delayMs, op, function (op) { return _this.removeDelayedOperation(op); });
        this.delayedOperations.push(delayedOp);
        return delayedOp;
    };
    AsyncQueue.prototype.verifyNotFailed = function () {
        if (this.failure) {
            fail('AsyncQueue is already failed: ' +
                (this.failure.stack || this.failure.message));
        }
    };
    /**
     * Verifies there's an operation currently in-progress on the AsyncQueue.
     * Unfortunately we can't verify that the running code is in the promise chain
     * of that operation, so this isn't a foolproof check, but it should be enough
     * to catch some bugs.
     */
    AsyncQueue.prototype.verifyOperationInProgress = function () {
        assert(this.operationInProgress, 'verifyOpInProgress() called when no op in progress on this queue.');
    };
    /**
     * Waits until all currently queued tasks are finished executing. Delayed
     * operations are not run.
     */
    AsyncQueue.prototype.drain = function () {
        return this.enqueue(function () { return Promise.resolve(); });
    };
    /**
     * For Tests: Determine if a delayed operation with a particular TimerId
     * exists.
     */
    AsyncQueue.prototype.containsDelayedOperation = function (timerId) {
        return this.delayedOperations.findIndex(function (op) { return op.timerId === timerId; }) >= 0;
    };
    /**
     * For Tests: Runs some or all delayed operations early.
     *
     * @param lastTimerId Delayed operations up to and including this TimerId will
     *  be drained. Throws if no such operation exists. Pass TimerId.All to run
     *  all delayed operations.
     * @returns a Promise that resolves once all operations have been run.
     */
    AsyncQueue.prototype.runDelayedOperationsEarly = function (lastTimerId) {
        var _this = this;
        // Note that draining may generate more delayed ops, so we do that first.
        return this.drain().then(function () {
            assert(lastTimerId === TimerId.All ||
                _this.containsDelayedOperation(lastTimerId), "Attempted to drain to missing operation " + lastTimerId);
            // Run ops in the same order they'd run if they ran naturally.
            _this.delayedOperations.sort(function (a, b) { return a.targetTimeMs - b.targetTimeMs; });
            for (var _i = 0, _a = _this.delayedOperations; _i < _a.length; _i++) {
                var op = _a[_i];
                op.skipDelay();
                if (lastTimerId !== TimerId.All && op.timerId === lastTimerId) {
                    break;
                }
            }
            return _this.drain();
        });
    };
    /** Called once a DelayedOperation is run or canceled. */
    AsyncQueue.prototype.removeDelayedOperation = function (op) {
        // NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
        var index = this.delayedOperations.indexOf(op);
        assert(index >= 0, 'Delayed operation not found.');
        this.delayedOperations.splice(index, 1);
    };
    return AsyncQueue;
}());
export { AsyncQueue };

//# sourceMappingURL=async_queue.js.map
