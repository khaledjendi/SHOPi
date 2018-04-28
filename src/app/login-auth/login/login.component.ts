import { Component, OnInit, HostBinding } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase'

import { Router } from '@angular/router';

import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

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
  user;
  error: any;
  constructor(public af: AngularFireAuth, public db: AngularFireAuth, private router: Router) {
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
    .catch(err => console.log(err));
  }

  loginGoogle() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(success => this.router.navigate(['']))
    .catch(err => this.error = err)
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
    if(this.loginForm.valid) {
      let email = <string><any>this.loginForm.value.email;
      let password = <string><any>this.loginForm.value.password
      // login part --- later.
    }
    else {
      console.log("invalid");
    }
    
  }

}
