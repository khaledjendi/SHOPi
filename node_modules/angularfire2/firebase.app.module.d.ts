import { InjectionToken } from '@angular/core';
import { FirebaseAppConfig } from './';
import { FirebaseApp as FBApp } from '@firebase/app-types';
import { FirebaseAuth } from '@firebase/auth-types';
import { FirebaseDatabase } from '@firebase/database-types';
import { FirebaseMessaging } from '@firebase/messaging-types';
import { FirebaseStorage } from '@firebase/storage-types';
import { FirebaseFirestore } from '@firebase/firestore-types';
export declare const FirebaseAppConfigToken: InjectionToken<FirebaseAppConfig>;
export declare class FirebaseApp implements FBApp {
    name: string;
    options: {};
    auth: () => FirebaseAuth;
    database: () => FirebaseDatabase;
    messaging: () => FirebaseMessaging;
    storage: () => FirebaseStorage;
    delete: () => Promise<any>;
    firestore: () => FirebaseFirestore;
}
export declare function _firebaseAppFactory(config: FirebaseAppConfig, appName?: string): FirebaseApp;
