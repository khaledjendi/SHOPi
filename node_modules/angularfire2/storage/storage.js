import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { createStorageRef } from './ref';
var AngularFireStorage = (function () {
    function AngularFireStorage(app) {
        this.app = app;
        this.storage = app.storage();
    }
    AngularFireStorage.prototype.ref = function (path) {
        return createStorageRef(this.storage.ref(path));
    };
    AngularFireStorage.prototype.upload = function (path, data, metadata) {
        var storageRef = this.storage.ref(path);
        var ref = createStorageRef(storageRef);
        return ref.put(data, metadata);
    };
    AngularFireStorage.decorators = [
        { type: Injectable },
    ];
    AngularFireStorage.ctorParameters = function () { return [
        { type: FirebaseApp, },
    ]; };
    return AngularFireStorage;
}());
export { AngularFireStorage };
//# sourceMappingURL=storage.js.map