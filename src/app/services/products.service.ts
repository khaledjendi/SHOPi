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
  AllBrands,
  AllProductFlowEntries,
  Brand,
  Files,
  File
}

export interface Pagination {
  limit: number;
  offset: number;
}

@Injectable()
export class ProductsService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Authorization': '' })
  };

  constructor(private auth: ApiAuthService, private http: HttpClient, private toastr: ToastrService) {
  }


  callGet(operator: CallOperator, id?, filter?, pagination?: Pagination) {
    if (!this.auth.isValidToken()) {
      return this.auth.authenticate()
        .then(() => {
          this.validateHeaders();
          return this.callGetMethod(operator, id, filter, pagination);
        });
    }
    else {
      return this.callGetMethod(operator, id, filter, pagination);
    }
  }

  private callGetMethod(operator: CallOperator, id?, filter?, pagination?: Pagination) {
    switch (operator) {
      case CallOperator.AllProducts:
        return this.getProductsInternal("", pagination);
      case CallOperator.TopsProducts:
        return this.getProductsByCategoryInternal("Tops", pagination)
      case CallOperator.JeansProducts:
        return this.getProductsByCategoryInternal("Jeans", pagination)
      case CallOperator.TShirtProducts:
        return this.getProductsByCategoryInternal("TShirts", pagination)
      case CallOperator.SkinnyProducts:
        return this.getProductsByCategoryInternal("Skinny", pagination)
      case CallOperator.ShirtsProducts:
        return this.getProductsByCategoryInternal("Shirts", pagination)
      case CallOperator.RegularProducts:
        return this.getProductsByCategoryInternal("Regular", pagination)
      case CallOperator.PoloShirtsProducts:
        return this.getProductsByCategoryInternal("PoloShirts", pagination)
      case CallOperator.KnitwearProducts:
        return this.getProductsByCategoryInternal("Knitwear", pagination)
      case CallOperator.AllBrands:
        return this.getBrandsInternal();
      case CallOperator.AllProductFlowEntries:
        return this.getProductFlowsInternal();
      case CallOperator.Product:
        return this.getProductsInternal(id);
      case CallOperator.Brand:
        return this.getBrandsInternal(id);
      case CallOperator.File:
        return this.getFileInternal(id);
    }
  }

  private getProductsByCategoryInternal(category, pagination?: Pagination) {
    let url = `https://api.moltin.com/v2/categories?filter=eq(name,${category})`;
    return this.http.get<any>(url, this.httpOptions)
      .map(categories => {
        if (categories && categories.data.length > 0) {
          if (pagination)
            url = `https://api.moltin.com/v2/products?filter=eq(category.id,${categories.data[0].id})&page[limit]=${pagination.limit}&page[offset]=${pagination.offset}`;
          else
            url = `https://api.moltin.com/v2/products?filter=eq(category.id,${categories.data[0].id})`
          return this.http.get<any>(url, this.httpOptions)
            .map(response => response)
            .catch(this.handleError("getProductsByCategoryInternal -- nested call"))
        }
        return null;
      })
      .catch(this.handleError("getProductsByCategoryInternal"))
  }

  private getProductFlowsInternal() {
    let url = 'https://api.moltin.com/v2/flows/products/entries/';
    return this.http.get<any>(url, this.httpOptions)
      .map(response => response)
      .catch(this.handleError("getAllProductsInternal"))
  }

  private getProductsInternal(id?, pagination?: Pagination) {
    let url: string;

    if (id) url = `https://api.moltin.com/v2/products/${id}`
    else {
      if (pagination)
        url = `https://api.moltin.com/v2/products?page[limit]=${pagination.limit}&page[offset]=${pagination.offset}`
      else
        url = 'https://api.moltin.com/v2/products'
    }

    return this.http.get<any>(url, this.httpOptions)
      .map(response => response)
      .catch(this.handleError("getAllProductsInternal"))
  }

  private getBrandsInternal(id?) {
    let url: string;
    if (id) url = 'https://api.moltin.com/v2/brands/' + id
    else url = 'https://api.moltin.com/v2/brands/'
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
