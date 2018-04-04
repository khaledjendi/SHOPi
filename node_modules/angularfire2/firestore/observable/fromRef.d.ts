import { DocumentReference, Query, QuerySnapshot, DocumentSnapshot } from '@firebase/firestore-types';
import { Observable } from 'rxjs/Observable';
import { Action } from '../interfaces';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
export declare function fromRef<R>(ref: DocumentReference | Query): Observable<R>;
export declare function fromDocRef(ref: DocumentReference): Observable<Action<DocumentSnapshot>>;
export declare function fromCollectionRef(ref: Query): Observable<Action<QuerySnapshot>>;
