import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase'

import { Router } from '@angular/router';
import { moveIn, fallIn } from '../../common/animation/router.animation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class SignupComponent implements OnInit {
  state: string = '';
  error: any;

  constructor(public af: AngularFireAuth,private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password)
      .then(success => this.router.navigate(['']))
      .catch(err => this.error = err)
    }
  }

}
