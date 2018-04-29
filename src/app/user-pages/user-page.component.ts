import { CartService } from './../services/cart.service';
import { LoginAuthService } from './../services/login-auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {
  constructor(public cartService: CartService,public loginAuthService: LoginAuthService) { 
  }

 
}
