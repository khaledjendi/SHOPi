import { CartProduct } from './../common/Cart';
import { Injectable } from '@angular/core';

@Injectable()
export class CartService {
  public cartProducts: CartProduct[] = [];
  
  constructor() { }

}
