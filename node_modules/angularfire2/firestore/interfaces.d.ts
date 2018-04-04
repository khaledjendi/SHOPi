import { Subscriber } from 'rxjs/Subscriber';
import { DocumentChangeType, DocumentChange, CollectionReference, Query } from '@firebase/firestore-types';
export interface DocumentChangeAction {
    type: DocumentChangeType;
    payload: DocumentChange;
}
export interface Action<T> {
    type: string;
    payload: T;
}
export interface Reference<T> {
    onSnapshot: (sub: Subscriber<any>) => any;
}
export declare type QueryFn = (ref: CollectionReference) => Query;
export interface AssociatedReference {
    ref: CollectionReference;
    query: Query;
}
