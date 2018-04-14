import { ApiAuthService } from './api-auth.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

export enum CallOperator {
  AllProducts,
  Product,
  File
}

@Injectable()
export class ProductsService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Authorization': '' })
  };

  constructor(private auth: ApiAuthService, private http: HttpClient) {
  }


  callGet(operator: CallOperator, id?, filter?) {
    if (!this.auth.isValidToken()) {
      return this.auth.authenticate()
        .then(() => {
          this.validateHeaders();
          return this.callGetMethod(operator, id, filter);
        });
    }
    else {
      return this.callGetMethod(operator, id, filter);
    }
  }

  private callGetMethod(operator: CallOperator, id?, filter?) {
    switch (operator) {
      case CallOperator.AllProducts:
        return this.getAllProductsInternal();
      case CallOperator.File:
        return this.getFileInternal(id);
    }
  }

  private getAllProductsInternal() {
    const url = 'https://api.moltin.com/v2/products';
    return this.http.get<any>(url, this.httpOptions)
  }

  private getFileInternal(id) {
    const url = 'https://api.moltin.com/v2/files/' + id;
    return this.http.get<any>(url, this.httpOptions)
  }

  validateHeaders() {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.auth.token.access_token })
    }
  }
}
