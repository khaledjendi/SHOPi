import { Observable } from 'rxjs/Observable';
import { DatabaseQuery, AngularFireAction } from '../interfaces';
import { DataSnapshot } from '@firebase/database-types';
export declare function createObjectSnapshotChanges(query: DatabaseQuery): () => Observable<AngularFireAction<DataSnapshot>>;
