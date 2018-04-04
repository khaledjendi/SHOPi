import { UploadTask, UploadTaskSnapshot } from '@firebase/storage-types';
import { Observable } from 'rxjs/Observable';
export declare function fromTask(task: UploadTask): Observable<UploadTaskSnapshot>;
