import { Config } from './../config';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class ApiAuthService {
  private _token;

  get token() {
    return this._token;
  }

  constructor() { }

  authenticate() {
    return new Promise((resolve, reject) => {
      Config.Moltin.Authenticate().then(token => {
        this._token = token;
        resolve();
      }, () => {
        reject();
      })
    });
  }

  isValidToken() {
    if(! this._token) return false;

    let epochCurrentTime = Math.round((new Date()).getTime() / 1000);
    return (epochCurrentTime < this._token.expires)
  }
}
