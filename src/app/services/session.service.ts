import { Injectable } from '@angular/core';
import { Product } from '../common/Product';

@Injectable()
export class SessionService {
  selectedProduct: Product;
  
  constructor() { }

}
