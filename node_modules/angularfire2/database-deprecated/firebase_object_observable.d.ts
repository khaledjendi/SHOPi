import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import { Reference } from '@firebase/database-types';
export declare class FirebaseObjectObservable<T> extends Observable<T> {
    $ref: Reference | undefined;
    constructor(subscribe?: <R>(subscriber: Subscriber<R>) => Subscription | Function | void, $ref?: Reference | undefined);
    lift<T, R>(operator: Operator<T, R>): Observable<R>;
    set(value: any): Promise<void>;
    update(value: Object): Promise<void>;
    remove(): Promise<void>;
}
