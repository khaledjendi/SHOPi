import { Config } from './../config';
import { Injectable } from '@angular/core';
import { ApiAuthService } from './api-auth.service';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import { ToastrService } from 'ngx-toastr';

export enum CallOperator {
  AllProducts,
  TopsProducts,
  JeansProducts,
  TShirtProducts,
  KnitwearProducts,
  PoloShirtsProducts,
  RegularProducts,
  ShirtsProducts,
  SkinnyProducts,
  Product,
  Brand,
  Files,
  File
}

@Injectable()
export class ProductsService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Authorization': '' })
  };

  constructor(private auth: ApiAuthService, private http: HttpClient, private toastr: ToastrService) {
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

  callAPI(operator: CallOperator) {
    switch (operator) {
      case CallOperator.TopsProducts:
        return Config.Moltin.Categories.Filter({ eq: { name: 'Tops' } }).All().then(categories => {
          return this.callApiProductsByCategory(categories);
        }).catch(this.handleError("callAPI"))
      case CallOperator.JeansProducts:
        return Config.Moltin.Categories.Filter({ eq: { name: 'Jeans' } }).All().then(categories => {
          return this.callApiProductsByCategory(categories);
        }).catch(this.handleError("callAPI"))
      case CallOperator.TShirtProducts:
        return Config.Moltin.Categories.Filter({ eq: { name: 'TShirts' } }).All().then(categories => {
          return this.callApiProductsByCategory(categories);
        }).catch(this.handleError("callAPI"))
      case CallOperator.SkinnyProducts:
        return Config.Moltin.Categories.Filter({ eq: { name: 'Skinny' } }).All().then(categories => {
          return this.callApiProductsByCategory(categories);
        }).catch(this.handleError("callAPI"))
      case CallOperator.ShirtsProducts:
        return Config.Moltin.Categories.Filter({ eq: { name: 'Shirts' } }).All().then(categories => {
          return this.callApiProductsByCategory(categories);
        }).catch(this.handleError("callAPI"))
      case CallOperator.RegularProducts:
        return Config.Moltin.Categories.Filter({ eq: { name: 'Regular' } }).All().then(categories => {
          return this.callApiProductsByCategory(categories);
        }).catch(this.handleError("callAPI"))
      case CallOperator.PoloShirtsProducts:
        return Config.Moltin.Categories.Filter({ eq: { name: 'PoloShirts' } }).All().then(categories => {
          return this.callApiProductsByCategory(categories);
        }).catch(this.handleError("callAPI"))
      case CallOperator.KnitwearProducts:
        return Config.Moltin.Categories.Filter({ eq: { name: 'Knitwear' } }).All().then(categories => {
          return this.callApiProductsByCategory(categories);
        }).catch(this.handleError("callAPI"))

    }
  }

  private callApiProductsByCategory(categories) {
    if (categories && categories.data.length > 0)
      return Config.Moltin.Products.Filter({ eq: { 'category.id': categories.data[0].id } }).All();
    return null;
  }

  private callGetMethod(operator: CallOperator, id?, filter?) {
    switch (operator) {
      case CallOperator.AllProducts:
        return this.getProductsInternal();
      case CallOperator.Product:
        return this.getProductsInternal(id);
      case CallOperator.Brand:
        return this.getBrandInternal(id);
      case CallOperator.File:
        return this.getFileInternal(id);
    }
  }

  private getProductsInternal(id?) {
    let url: string;
    if (id) url = 'https://api.moltin.com/v2/products/' + id
    else url = 'https://api.moltin.com/v2/products'
    return this.http.get<any>(url, this.httpOptions)
      .map(response => response)
      .catch(this.handleError("getAllProductsInternal"))
  }

  private getBrandInternal(id) {
    const url = 'https://api.moltin.com/v2/brands/' + id;
    return this.http.get<any>(url, this.httpOptions)
      .map(response => response)
      .catch(this.handleError("getBrandInternal", false))
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

  private handleError(operation = 'operation', toastError = true) {
    return (error: HttpErrorResponse) => {

      if (toastError)
        this.toastr.error('Unexpected error while loading. Admin is notified.', 'Error', {
          timeOut: 7000,
          easing: 'easeOutBounce',
          progressBar: true,
          positionClass: 'toast-top-full-width'
        });
      // push error in firebase --- future work ---
      console.log(operation + ' API Error: ', error.message);
      throw error;
    };
  }
}
