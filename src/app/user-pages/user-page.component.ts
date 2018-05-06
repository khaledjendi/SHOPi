import { CartService } from './../services/cart.service';
import { LoginAuthService } from './../services/login-auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

export enum UserPageType {
  Overivew,
  Orders
}

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {
  userPageType = UserPageType.Overivew
  pagePage = UserPageType[this.userPageType]
  totalOrders: number;

  constructor(public cartService: CartService, public loginAuthService: LoginAuthService) {
    let ordersRef = firebase.database().ref('orders');
    ordersRef.orderByChild('userId').equalTo('kNW9Xrn2BITbjylfjYpIkuppc2q1').on('value', snapshot => {
      this.totalOrders = snapshot.numChildren() ? snapshot.numChildren() : 0;
    })
  }


}
