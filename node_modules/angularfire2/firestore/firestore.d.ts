import { FirebaseFirestore, CollectionReference } from '@firebase/firestore-types';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { FirebaseApp } from 'angularfire2';
import { QueryFn, AssociatedReference } from './interfaces';
import { AngularFirestoreDocument } from './document/document';
import { AngularFirestoreCollection } from './collection/collection';
export declare function associateQuery(collectionRef: CollectionReference, queryFn?: (ref: any) => any): AssociatedReference;
export declare class AngularFirestore {
    app: FirebaseApp;
    readonly firestore: FirebaseFirestore;
    readonly persistenceEnabled$: Observable<boolean>;
    constructor(app: FirebaseApp, shouldEnablePersistence: boolean);
    collection<T>(path: string, queryFn?: QueryFn): AngularFirestoreCollection<T>;
    doc<T>(path: string): AngularFirestoreDocument<T>;
    createId(): string;
}
