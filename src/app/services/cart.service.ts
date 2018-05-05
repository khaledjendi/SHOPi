import { LoginAuthService } from './login-auth.service';
import { CartProduct } from './../common/Cart';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class CartService {
  @Output("changeFloatCartView") changeFloatCartView: EventEmitter<boolean> = new EventEmitter();

  public cartProducts: CartProduct[] = [];
  public totalCartPrice: number = 0;
  public totalCartDiscount: number = 0;
  public floatCartView = false;
  private userId = "";

  constructor(private loginAuthService: LoginAuthService) {
    this.getSavedCartByUser();
  }

  setFloatCartView(status) {
    this.floatCartView = status;
    this.changeFloatCartView.emit(this.floatCartView);
  }

  saveCart() {
    localStorage.setItem(`${this.userId}_cartProducts`, JSON.stringify(this.cartProducts))
  }

  getSavedCartByUser() {
    this.loginAuthService.currentUserObservable.subscribe(user => {
      if (user)
        this.userId = user['uid'] || '';
      else
        this.userId = '';
      this.getSavedCart();
    });
  }

  private getSavedCart() {
    let localStorageCart = JSON.parse(localStorage.getItem(`${this.userId}_cartProducts`));
    this.cartProducts = localStorageCart == null ? [] : localStorageCart;
  }
}
