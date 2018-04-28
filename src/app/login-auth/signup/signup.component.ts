import { ToastrService } from 'ngx-toastr';
import { LoginErrorStateMatcher } from './../login/login.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase'

import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  state: string = '';
  error: any;
  passwordNotMatch: boolean = false;

  constructor(public af: AngularFireAuth, private router: Router, private toastr: ToastrService) {
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
          user.updateProfile({
            displayName: displayName
          })
          this.router.navigate(['/login'])
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

}
