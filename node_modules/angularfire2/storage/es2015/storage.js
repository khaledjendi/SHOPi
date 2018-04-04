import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { createStorageRef } from './ref';
export class AngularFireStorage {
    constructor(app) {
        this.app = app;
        this.storage = app.storage();
    }
    ref(path) {
        return createStorageRef(this.storage.ref(path));
    }
    upload(path, data, metadata) {
        const storageRef = this.storage.ref(path);
        const ref = createStorageRef(storageRef);
        return ref.put(data, metadata);
    }
}
AngularFireStorage.decorators = [
    { type: Injectable },
];
AngularFireStorage.ctorParameters = () => [
    { type: FirebaseApp, },
];
//# sourceMappingURL=storage.js.map