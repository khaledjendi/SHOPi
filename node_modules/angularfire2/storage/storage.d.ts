import { FirebaseStorage, UploadMetadata } from '@firebase/storage-types';
import { FirebaseApp } from 'angularfire2';
import { AngularFireStorageReference } from './ref';
import { AngularFireUploadTask } from './task';
export declare class AngularFireStorage {
    app: FirebaseApp;
    storage: FirebaseStorage;
    constructor(app: FirebaseApp);
    ref(path: string): AngularFireStorageReference;
    upload(path: string, data: any, metadata?: UploadMetadata): AngularFireUploadTask;
}
