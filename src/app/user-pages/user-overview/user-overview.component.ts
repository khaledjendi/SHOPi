import { Order } from './../../common/order';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginAuthService } from './../../services/login-auth.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit {
  @Input('totalOrders') totalOrders: number;

  constructor(public cartService: CartService, public loginAuthService: LoginAuthService) {
    
  }

  ngOnInit() {
  }

}
