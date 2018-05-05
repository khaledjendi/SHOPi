import { CartService } from './cart.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
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
  constructor(private afAuth: AngularFireAuth, private router: Router) {
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

  get currentUserId(): string {
    if (!this.authState) { return 'Guest' }
    else { return this.authState['uid'] || '' }
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

  canActivate(router, state: RouterStateSnapshot): Observable<boolean> {
    return Observable.from(this.afAuth.authState)
      .take(1)
      .map(authState => !!authState)
      .do(authenticated => {
        if (!authenticated)
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
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
  }

  signin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  }
}
