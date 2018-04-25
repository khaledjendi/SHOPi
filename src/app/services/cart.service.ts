import { CartProduct } from './../common/Cart';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class CartService {
  @Output("changeFloatCartView") changeFloatCartView: EventEmitter<boolean> = new EventEmitter();
  
  public cartProducts: CartProduct[] = [];
  public totalCartPrice:number = 0;
  public totalCartDiscount:number = 0;
  public floatCartView = false;
  
  constructor() { 
    
  }
  
  setFloatCartView(status) {
    this.floatCartView = status;
    this.changeFloatCartView.emit(this.floatCartView);
  }


}
