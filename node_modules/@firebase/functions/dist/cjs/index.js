"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var app_1 = require("@firebase/app");
var service_1 = require("./src/api/service");
/**
 * Type constant for Firebase Functions.
 */
var FUNCTIONS_TYPE = 'functions';
function factory(app, unused, region) {
    return new service_1.Service(app, region);
}
function registerFunctions(instance) {
    var namespaceExports = {
        // no-inline
        Functions: service_1.Service
    };
    instance.INTERNAL.registerService(FUNCTIONS_TYPE, factory, namespaceExports, 
    // We don't need to wait on any AppHooks.
    undefined, 
    // Allow multiple functions instances per app.
    true);
}
exports.registerFunctions = registerFunctions;
registerFunctions(app_1.default);

//# sourceMappingURL=index.js.map
