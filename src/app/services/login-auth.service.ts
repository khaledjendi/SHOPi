import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class LoginAuthService {
  constructor(private auth: AngularFireAuth, private router: Router) { }

  // this method will be used in user pages (mina sidor)
  canActivate(): Observable<boolean> {
    return Observable.from(this.auth.authState)
      .take(1)
      .map(authState => !!authState)
      .do(authenticated => {
        if (!authenticated)
          this.router.navigate(['/login']);
      })
  }

}
