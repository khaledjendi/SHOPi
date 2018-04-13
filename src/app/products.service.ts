import { ApiAuthService } from './api-auth.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ProductsService {
  httpOptions;
  constructor(private auth: ApiAuthService, private http: HttpClient) { 
    if(this.auth.token)
    this.httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' +  this.auth.token.access_token })
    };
  }

  getAllProducts() {
    console.log("token: ", this.auth.token);
    this.httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' +  this.auth.token.access_token })
    };
    console.log("header: ", this.httpOptions);
    const url = 'https://api.moltin.com/v2/products';
    return this.http.get<any>(url, this.httpOptions)
    .subscribe(response => {
      console.log(response);
    })
  }
}
