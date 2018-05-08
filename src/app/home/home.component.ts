import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { PageType } from '../common/headers/common-header/common-header.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  page: PageType = PageType.Men;

  constructor(cartService: CartService) { 
    cartService.getSavedCartByUser();
  }

  ngOnInit() {
  }

  onHeaderChanged(page: PageType) {
    //this.page = page; // I will work only for men section so I am disabling other sections
    this.page = PageType.Men
  }
}
