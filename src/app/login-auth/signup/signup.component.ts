import { CartService } from './../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { LoginErrorStateMatcher } from './../login/login.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase'

import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent {
  state: string = '';
  error: any;
  passwordNotMatch: boolean = false;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;
  fileName: string;
  photoURL: string = "";

  createForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required
    ]),
    lastName: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required
    ])
  })

  get email() {
    return this.createForm.get('email')
  }

  get password() {
    return this.createForm.get('password')
  }

  get passwordConfirmation() {
    return this.createForm.get('passwordConfirmation')
  }

  get firstName() {
    return this.createForm.get('firstName')
  }

  get lastName() {
    return this.createForm.get('lastName')
  }

  matcher = new LoginErrorStateMatcher();

  constructor(public af: AngularFireAuth, private router: Router, private toastr: ToastrService, private storage: AngularFireStorage, private db: AngularFirestore, private route: ActivatedRoute, private cartService: CartService) {
    this.af.authState.subscribe(auth => {
      if (auth) {
        this.navigateBack();
      }
    });
  }

  loginFb() {
    this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(success => this.navigateBack())
      .catch(err => {
        this.toast(err, "Facebook Error", "error", 3000);
        this.error = err
      })
  }

  loginGoogle() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(success => this.navigateBack())
      .catch(err => {
        this.toast(err, "Google Error", "error", 3000);
        this.error = err
      })
  }

  private navigateBack() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    this.router.navigate([returnUrl || '/']);
  }

  onSubmit() {
    this.error = undefined;
    if (this.createForm.valid) {
      let displayName = <string><any>this.createForm.value.firstName + " " + <string><any>this.createForm.value.lastName;
      let email = <string><any>this.createForm.value.email;
      let password = <string><any>this.createForm.value.password;
      let passwordConfirmation = <string><any>this.createForm.value.passwordConfirmation;

      if (password !== passwordConfirmation) {
        this.passwordNotMatch = true;
        this.toast("Confirmation password does not match the entered password", "Error", "error", 3000);
        return;
      }
      this.passwordNotMatch = false;

      this.af.auth.createUserWithEmailAndPassword(email, password)
        .then(user => {
          this.cartService.getSavedCartByUser();
          user.updateProfile({
            displayName: displayName,
            photoURL: this.photoURL
          })

          this.navigateBack();
        })
        .catch(err => {
          this.toast(err, "Error", "error", 3000);
          this.error = err
        })
    }
  }

  private toast(message, header, type, timeOut) {
    switch (type) {
      case "error":
        this.toastr.error(message, header, {
          timeOut: timeOut,
          easing: 'easeOutBounce',
          progressBar: true
        });
        break;
      case "warning":
        this.toastr.warning(message, header, {
          timeOut: timeOut,
          easing: 'easeOutBounce',
          progressBar: true
        });
        break;
      case "info":
        this.toastr.info(message, header, {
          timeOut: timeOut,
          easing: 'easeOutBounce',
          progressBar: true
        });
        break;
      case "success":
        this.toastr.success(message, header, {
          timeOut: timeOut,
          easing: 'easeOutBounce',
          progressBar: true
        });
        break;
    }
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {

    const file = event.item(0)

    if (file.type.split('/')[0] !== 'image') {
      this.toast("Unsupported file type", "Error", "error", 3000);
      return;
    }

    if (this.fileName && this.fileName.length > 0) {
      var desertRef = this.storage.storage.ref().child(`profile_images/${this.fileName}`);
      desertRef.delete()
        .then(() => { console.log("File profile_images/" + this.fileName + " deleted") })
        .catch(error => console.log("delete previous file error", error));
    }

    this.fileName = new Date().getTime() + "_" + file.name;

    let path = `profile_images/${this.fileName}`;

    const customMetadata = { app: 'SHOPi Profiles!' };

    this.task = this.storage.upload(path, file, { customMetadata })

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          this.db.collection('photos').add({ path, size: snap.totalBytes })
        }
      })
    )
    this.downloadURL = this.task.downloadURL();
    this.downloadURL.subscribe(photoURL => this.photoURL = photoURL, error => this.photoURL = "")
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

}
