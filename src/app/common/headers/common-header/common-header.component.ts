import { LoginAuthService } from './../../../services/login-auth.service';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export enum PageType {
  Home = 0,
  Men = 1,
  Woman = 2,
  Kids = 3,
  Deals = 4
}

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss']
})
export class CommonHeaderComponent implements OnInit {
  @Output() change = new EventEmitter();
  welcomeUser;
  activeLinks = {
    isHomeActive: false,
    isManActive: true,
    isWomanActive: false,
    isKidsActive: false,
    isHotDealsActive: false
  }

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

  changePage(type) {
    switch (type) {
      case 'home':
        if (this.activeLinks.isHomeActive) break;
        this.activeLinks = {
          isHomeActive: true,
          isManActive: false,
          isWomanActive: false,
          isKidsActive: false,
          isHotDealsActive: false
        }
        this.change.emit(PageType.Home);
        break;
      case 'man':
        if (this.activeLinks.isManActive) break;
        this.activeLinks = {
          isHomeActive: false,
          isManActive: true,
          isWomanActive: false,
          isKidsActive: false,
          isHotDealsActive: false
        }
        this.change.emit(PageType.Men);
        break;
      case 'woman':
        if (this.activeLinks.isWomanActive) break;
        this.activeLinks = {
          isHomeActive: false,
          isManActive: false,
          isWomanActive: true,
          isKidsActive: false,
          isHotDealsActive: false
        }
        this.change.emit(PageType.Woman);
        break;
      case 'kids':
        if (this.activeLinks.isKidsActive) break;
        this.activeLinks = {
          isHomeActive: false,
          isManActive: false,
          isWomanActive: false,
          isKidsActive: true,
          isHotDealsActive: false
        }
        this.change.emit(PageType.Kids);
        break;
      case 'deals':
        if (this.activeLinks.isHotDealsActive) break;
        this.activeLinks = {
          isHomeActive: false,
          isManActive: false,
          isWomanActive: false,
          isKidsActive: false,
          isHotDealsActive: true
        }
        this.change.emit(PageType.Deals);
        break;
    }
  }

  showFloatCart() {
    this.cartService.setFloatCartView(true);
  }
}
