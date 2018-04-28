import { Injectable } from '@angular/core';
import { Upload } from '../common/upload';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class UploadService {

  constructor(private db: AngularFireDatabase) { }

  pushUpload(upload: Upload, folder: string) {
    folder = folder ? folder : "profile_images";
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${folder}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        //this.saveFileData(upload)
      }
    );
  }

  private saveFileData(upload: Upload) {
    this.db.list(`uploads`).push(upload);
  }


}
