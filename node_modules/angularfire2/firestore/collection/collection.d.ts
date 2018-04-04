import { DocumentChangeType, CollectionReference, Query, DocumentReference } from '@firebase/firestore-types';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { DocumentChangeAction } from '../interfaces';
import { AngularFirestoreDocument } from '../document/document';
export declare function validateEventsArray(events?: DocumentChangeType[]): DocumentChangeType[];
export declare class AngularFirestoreCollection<T> {
    readonly ref: CollectionReference;
    private readonly query;
    constructor(ref: CollectionReference, query: Query);
    stateChanges(events?: DocumentChangeType[]): Observable<DocumentChangeAction[]>;
    auditTrail(events?: DocumentChangeType[]): Observable<DocumentChangeAction[]>;
    snapshotChanges(events?: DocumentChangeType[]): Observable<DocumentChangeAction[]>;
    valueChanges(events?: DocumentChangeType[]): Observable<T[]>;
    add(data: T): Promise<DocumentReference>;
    doc<T>(path: string): AngularFirestoreDocument<T>;
}
