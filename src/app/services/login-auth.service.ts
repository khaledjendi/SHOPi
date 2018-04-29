import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Rx";
import { User } from '@firebase/auth-types';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import * as firebase from 'firebase'

@Injectable()
export class LoginAuthService {
  authState: any = null;
  error;
  constructor(private afAuth: AngularFireAuth, private router: Router, private toastr: ToastrService) {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.authState = auth
      }
    });
  }

  get currentUserObservable(): Observable<User> {
    return this.afAuth.authState
  }

  get currentUserDisplayName(): string {
    if (!this.authState) { return 'Guest' }
    else { return this.authState['displayName'] || '' }
  }

  get currentUserPhotoURL(): string {
    return this.authState['photoURL'] || '../../assets/img/login/default-user.png'
  }

  get currentUserEmail(): string {
    return this.authState['email'] || ''
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.authState = null;
      this.router.navigate(['/']);
    });
  }

  canActivate(): Observable<boolean> {
    return Observable.from(this.afAuth.authState)
      .take(1)
      .map(authState => !!authState)
      .do(authenticated => {
        if (!authenticated)
          this.router.navigate(['/login']);
      })
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then(credential => {
        this.authState = credential.user;
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.toast(err, "Facebook Error", "error", 3000);
        this.error = err
      });
  }

  signin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.authState = user;
        this.router.navigate(['/']);
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
