import { createUploadTask } from './task';
import { from } from 'rxjs/observable/from';
export function createStorageRef(ref) {
    return {
        getDownloadURL: function () { return from(ref.getDownloadURL()); },
        getMetadata: function () { return from(ref.getMetadata()); },
        delete: function () { return from(ref.delete()); },
        child: function (path) { return createStorageRef(ref.child(path)); },
        updateMetatdata: function (meta) { return from(ref.updateMetadata(meta)); },
        put: function (data, metadata) {
            var task = ref.put(data, metadata);
            return createUploadTask(task);
        },
        putString: function (data, format, metadata) {
            var task = ref.putString(data, format, metadata);
            return createUploadTask(task);
        }
    };
}
//# sourceMappingURL=ref.js.map