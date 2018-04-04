import { createUploadTask } from './task';
import { from } from 'rxjs/observable/from';
export function createStorageRef(ref) {
    return {
        getDownloadURL: () => from(ref.getDownloadURL()),
        getMetadata: () => from(ref.getMetadata()),
        delete: () => from(ref.delete()),
        child: (path) => createStorageRef(ref.child(path)),
        updateMetatdata: (meta) => from(ref.updateMetadata(meta)),
        put: (data, metadata) => {
            const task = ref.put(data, metadata);
            return createUploadTask(task);
        },
        putString: (data, format, metadata) => {
            const task = ref.putString(data, format, metadata);
            return createUploadTask(task);
        }
    };
}
//# sourceMappingURL=ref.js.map