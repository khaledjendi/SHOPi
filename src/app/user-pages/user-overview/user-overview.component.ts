import { Order } from './../../common/order';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginAuthService } from './../../services/login-auth.service';
import { CartService } from './../../services/cart.service';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent {
  @Input('totalOrders') totalOrders: number;
  @Output('ordersClicked') ordersClicked = new EventEmitter();

  constructor(public cartService: CartService, public loginAuthService: LoginAuthService) {
  }

  goToOrders(event) {
    event.stopPropagation();
    this.ordersClicked.emit();
  }
}
