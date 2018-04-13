import { Config } from './config';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class ApiAuthService {
  token;
  constructor() { }

  authenticate() {
    Config.Moltin.Authenticate().then(token => {
      this.token = token;
    })
  }

  isValidToken() {
    if(! this.token) return false;

    let epochCurrentTime = Math.round((new Date()).getTime() / 1000);
    return (epochCurrentTime < this.token.expires)
  }
}
