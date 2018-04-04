import { DatabaseQuery, ChildEvent, AngularFireAction } from '../interfaces';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/scan';
import { DataSnapshot } from '@firebase/database-types';
export declare function createStateChanges(query: DatabaseQuery): (events?: ChildEvent[] | undefined) => Observable<AngularFireAction<DataSnapshot>>;
export declare function stateChanges(query: DatabaseQuery, events?: ChildEvent[]): Observable<AngularFireAction<DataSnapshot>>;
