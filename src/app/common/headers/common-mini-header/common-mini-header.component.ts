import { LoginAuthService } from './../../../services/login-auth.service';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-mini-header',
  templateUrl: './common-mini-header.component.html',
  styleUrls: ['./common-mini-header.component.scss']
})
export class CommonMiniHeaderComponent implements OnInit {
  welcomeUser = "Welcome";
  
  constructor(public cartService: CartService, private loginAuthService: LoginAuthService) {
    this.loginAuthService.currentUserObservable.subscribe(user => {
      if (user)
        this.welcomeUser = `Welcome ${this.loginAuthService.currentUserDisplayName}`
      else
        this.welcomeUser = "Welcome";
    });
  }


  ngOnInit() {
  }
  
  showFloatCart() {
    this.cartService.setFloatCartView(true);
  }
}
