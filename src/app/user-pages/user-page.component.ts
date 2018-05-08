import { CartProduct } from './../common/Cart';
import { MatTableDataSource } from '@angular/material';
import { userPageAnimation } from './user-pages.component.animations';
import { CartService } from './../services/cart.service';
import { LoginAuthService } from './../services/login-auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

export enum UserPageType {
  Overivew = 0,
  Orders = 1,
  PaymentOptions = 2
}

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  animations: [userPageAnimation]
})
export class UserPageComponent {
  userPageType = UserPageType.Overivew;
  pagePage = UserPageType[this.userPageType]
  totalOrders: number;
  orders = [];

  constructor(public cartService: CartService, public loginAuthService: LoginAuthService) {
    let ordersRef = firebase.database().ref('orders');
    ordersRef.orderByChild('userId').equalTo(loginAuthService.currentUserId).on('value', snapshot => {
      this.totalOrders = snapshot.numChildren() ? snapshot.numChildren() : 0;
      snapshot.forEach(childSnapshot => {
        let key = childSnapshot.key;
        let value = childSnapshot.val();

        let dataSource = new MatTableDataSource(<CartProduct[]>value.cartProducts)
        dataSource.filterPredicate =
          (data: CartProduct, filter: string) => {
            //console.log(data.product.name);
            let bool = data.product.name.toLowerCase().indexOf(filter) != -1 ||
              data.product.price.amount.toString().toLowerCase().indexOf(filter) != -1
            return bool;
          };

        this.orders.push({
          key: key,
          value: value,
          animation: false,
          animationIcon: false,
          dataSource: dataSource
        })
        return false;
      })
    })
  }

  goToPage(pageType: UserPageType, event?) {
    if (event)
      event.stopPropagation();
    switch (pageType) {
      case UserPageType.Overivew:
        this.userPageType = UserPageType.Overivew;
        this.pagePage = UserPageType[this.userPageType];
        break;
      case UserPageType.Orders:
        this.userPageType = UserPageType.Orders;
        this.pagePage = UserPageType[this.userPageType];
        break;
      case UserPageType.PaymentOptions:
        this.userPageType = UserPageType.PaymentOptions;
        this.pagePage = UserPageType[this.userPageType];
        break;
    }
  }

}
