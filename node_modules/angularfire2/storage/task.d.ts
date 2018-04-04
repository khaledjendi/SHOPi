import { UploadTaskSnapshot, UploadTask } from '@firebase/storage-types';
import { Observable } from 'rxjs/Observable';
export interface AngularFireUploadTask {
    task: UploadTask;
    snapshotChanges(): Observable<UploadTaskSnapshot | undefined>;
    percentageChanges(): Observable<number | undefined>;
    downloadURL(): Observable<string | null>;
    pause(): boolean;
    cancel(): boolean;
    resume(): boolean;
    then(onFulfilled?: ((a: UploadTaskSnapshot) => any) | null, onRejected?: ((a: Error) => any) | null): Promise<any>;
    catch(onRejected: (a: Error) => any): Promise<any>;
}
export declare function createUploadTask(task: UploadTask): AngularFireUploadTask;
