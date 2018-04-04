import * as tslib_1 from "tslib";
/**
 * Helper class to get metadata that should be included with a function call.
 */
var ContextProvider = /** @class */ (function () {
    function ContextProvider(app) {
        this.app = app;
    }
    ContextProvider.prototype.getAuthToken = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var token, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.app.INTERNAL.getToken()];
                    case 1:
                        token = _a.sent();
                        if (!token) {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/, token.accessToken];
                    case 2:
                        e_1 = _a.sent();
                        // If there's any error when trying to get the auth token, leave it off.
                        return [2 /*return*/, undefined];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContextProvider.prototype.getInstanceIdToken = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var messaging, token, e_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // HACK: Until we have a separate instanceId package, this is a quick way
                        // to load in the messaging instance for this app.
                        if (!this.app.messaging) {
                            return [2 /*return*/, undefined];
                        }
                        messaging = this.app.messaging();
                        return [4 /*yield*/, messaging.getToken()];
                    case 1:
                        token = _a.sent();
                        if (!token) {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/, token];
                    case 2:
                        e_2 = _a.sent();
                        // We don't warn on this, because it usually means messaging isn't set up.
                        // console.warn('Failed to retrieve instance id token.', e);
                        // If there's any error when trying to get the token, leave it off.
                        return [2 /*return*/, undefined];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContextProvider.prototype.getContext = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var authToken, instanceIdToken;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAuthToken()];
                    case 1:
                        authToken = _a.sent();
                        return [4 /*yield*/, this.getInstanceIdToken()];
                    case 2:
                        instanceIdToken = _a.sent();
                        return [2 /*return*/, { authToken: authToken, instanceIdToken: instanceIdToken }];
                }
            });
        });
    };
    return ContextProvider;
}());
export { ContextProvider };

//# sourceMappingURL=context.js.map
