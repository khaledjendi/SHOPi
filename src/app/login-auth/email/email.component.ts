import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase'

import { Router } from '@angular/router';
import { moveIn, fallIn } from '../../common/animation/router.animation';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})

export class EmailComponent implements OnInit {

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

  onSubmit(formData) {
    if(formData.valid) {
      this.af.auth.signInAndRetrieveDataWithEmailAndPassword(formData.value.email, formData.value.password)
      .then(success => this.router.navigate(['']))
      .catch(err => this.error = err)
    }
  }
}
