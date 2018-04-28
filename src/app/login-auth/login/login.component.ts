import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, HostBinding } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase'

import { Router } from '@angular/router';

import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class LoginErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  error: any;
  constructor(public af: AngularFireAuth, public db: AngularFireAuth, private router: Router, private toastr: ToastrService) {
    this.af.authState.subscribe(auth => {
      if (auth) {
        console.log("user logged in!", auth)
        this.router.navigate(['']);
      }
    });
  }

  ngOnInit() {
  }

  loginFb() {
    this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(success => this.router.navigate(['']))
      .catch(err => {
        this.toast(err, "Facebook Error", "error", 3000);
        this.error = err
      })
  }

  loginGoogle() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(success => this.router.navigate(['']))
      .catch(err => {
        this.toast(err, "Google Error", "error", 3000);
        this.error = err
      })
  }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  })

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

  matcher = new LoginErrorStateMatcher();

  onSubmit() {
    if (this.loginForm.valid) {
      let email = <string><any>this.loginForm.value.email;
      let password = <string><any>this.loginForm.value.password
      this.af.auth.signInWithEmailAndPassword(email, password)
        .then(success => this.router.navigate(['']))
        .catch(err => {
          switch (err.code) {
            case "auth/user-not-found":
              this.error = "There is no user record corresponding to this identifier";
              this.toast("There is no user record corresponding to this identifier", "Error", "error", 3000);
              break;
            default:
              this.toast(err, "Error", "error", 3000);
              this.error = err
              break;
          }
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

}
