import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductsDataService {
  productsData = new Subject<any>();
  constructor() { }
}
