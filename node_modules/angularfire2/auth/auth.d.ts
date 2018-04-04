import { FirebaseAuth, User } from '@firebase/auth-types';
import { Observable } from 'rxjs/Observable';
import { FirebaseApp } from 'angularfire2';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
export declare class AngularFireAuth {
    app: FirebaseApp;
    readonly auth: FirebaseAuth;
    readonly authState: Observable<User | null>;
    readonly idToken: Observable<string | null>;
    constructor(app: FirebaseApp);
}
