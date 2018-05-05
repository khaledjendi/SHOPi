import { CartService } from './../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { LoginAuthService } from './../../services/login-auth.service';
import { Component, OnInit, HostBinding } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

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
  constructor(private router: Router, private loginAuthService: LoginAuthService, private route: ActivatedRoute, private toastr: ToastrService, private cartService: CartService) {
    this.loginAuthService.currentUserObservable.subscribe(user => {
      if (user) {
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/']);
      }
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

  completeSocialLogin(promiseToLogin: Promise<any>) {
    promiseToLogin.then(credential => {
      this.loginAuthService.authState = credential.user;
      this.cartService.getSavedCartByUser();
      this.navigateBack();
    })
      .catch(err => {
        this.toast(err, "Facebook Error", "error", 3000);
        this.error = err
      });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let email = <string><any>this.loginForm.value.email;
      let password = <string><any>this.loginForm.value.password
      this.loginAuthService.signin(email, password)
        .then(user => {
          this.loginAuthService.authState = user;
          this.cartService.getSavedCartByUser();
          this.navigateBack();
        })
        .catch(err => {
          switch (err.code) {
            case "auth/user-not-found":
              this.error = "There is no user record corresponding to this identifier";
              this.toast("There is no user record corresponding to this identifier", "Error", "error", 3000);
              break;
            default:
              this.toast(err, "Error", "error", 3000);
              this.error = err;
              break;
          }
        });
    }
  }

  private navigateBack() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    this.router.navigate([returnUrl || '/']);
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
