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
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
      },
      (error) => {
        // save to firebase log [future work]. 
        //console.log(error)
      },
      () => {
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
      }
    );
  }

  private saveFileData(upload: Upload) {
    this.db.list(`uploads`).push(upload);
  }


}
