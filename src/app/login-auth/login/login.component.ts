import { LoginAuthService } from './../../services/login-auth.service';
import { Component, OnInit, HostBinding } from '@angular/core';

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

export class LoginComponent {
  error: any;
  constructor(private router: Router, private loginAuthService: LoginAuthService) {
    this.loginAuthService.currentUserObservable.subscribe(user => {
      if (user)
        this.router.navigate(['/']);
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

  loginFb() {
    this.loginAuthService.facebookLogin();
  }

  loginGoogle() {
    this.loginAuthService.googleLogin();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let email = <string><any>this.loginForm.value.email;
      let password = <string><any>this.loginForm.value.password
      this.loginAuthService.signin(email, password);
    }
  }

}
