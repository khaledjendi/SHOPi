import { ApiAuthService } from './api-auth.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import {Observable} from 'rxjs/Rx'; 


@Injectable()
export class ProductsService {
  httpOptions;

  constructor(private auth: ApiAuthService, private http: HttpClient) {
  }

  getAllProducts() {
    if (!this.auth.isValidToken()) {
      return this.auth.authenticate()
        .then(() => {
          this.validateHeaders();
          return this.getAllProductsInternal()
        });
    }
    else {
      return this.getAllProductsInternal();
    }
  }

  private getAllProductsInternal() {
    const url = 'https://api.moltin.com/v2/products';
    return this.http.get(url, this.httpOptions)
     
  }

  validateHeaders() {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.token.access_token })
    }
  }
}
