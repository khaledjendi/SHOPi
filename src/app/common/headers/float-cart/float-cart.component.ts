import { Price } from './../../Price';
import { CartProduct } from './../../Cart';
import { MatTableDataSource } from '@angular/material';
import { floatCartAnimation } from './float-cart.animation';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-float-cart',
  templateUrl: './float-cart.component.html',
  styleUrls: ['./float-cart.component.scss'],
  animations: [
    floatCartAnimation
  ]
})
export class FloatCartComponent implements OnInit {

  displayedColumns = ['item', 'price', 'details', 'remove'];
  dataSource = new MatTableDataSource();
  //isAllowClose = false;


  constructor(public cartService: CartService) {
    this.dataSource.filterPredicate =
      (data: CartProduct, filter: string) => {
        let bool = data.product.name.toLowerCase().indexOf(filter) != -1 ||
          data.product.price.amount.toString().toLowerCase().indexOf(filter) != -1
        return bool;
      };

  }

  ngOnInit() {
    this.cartService.changeFloatCartView.subscribe(floatCartView => {
      if (floatCartView) {
        this.getTotal();
        this.dataSource.data = this.cartService.cartProducts;
      }
    });
  }

  getWindowHeight() {
    let body = document.body, html = document.documentElement;
    return Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight) + "px";
  }

  closeFloatCart() {
    this.cartService.setFloatCartView(false);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  removeFromCart(event, id) {
    event.stopPropagation();
    for (let i = 0; i < this.cartService.cartProducts.length; i++) {
      if (this.cartService.cartProducts[i].product.id === id) {
        this.cartService.cartProducts.splice(i, 1);
      }
    }
    this.dataSource.data = this.cartService.cartProducts;
    this.getTotal();
    this.cartService.saveCart();
  }

  getPrice(price: Price, discount: number) {
    if (this.eligibleDiscount(discount))
      return Price.getDisountPrice(price.amount, discount, price.currencyAbbr);
    return price.formattedPrice;
  }

  private eligibleDiscount(discount: number) {
    return (discount && discount > 0);
  }

  changeAmount(type, cartProduct: CartProduct) {
    if (type === "decrease") {
      if (cartProduct.amount <= 1)
        cartProduct.amount = 1;
      else
        cartProduct.amount--;
    }
    else if (type === "increase") {
      if (cartProduct.amount >= 10)
        cartProduct.amount = 10;
      else
        cartProduct.amount++;
    }
    this.getTotal();
    this.cartService.saveCart();
  }

  getTotal() {
    let totalPrice = 0;
    let totalDiscount = 0;
    for(let cartProduct of this.cartService.cartProducts) {
      let price = Price.getDisountPrice(cartProduct.product.price.amount, cartProduct.product.discount, "", 2, true);
      let discount = Price.getDisount(cartProduct.product.price.amount, cartProduct.product.discount, "", 2, true)
      totalPrice += cartProduct.amount *  <number><any>price;
      totalDiscount += cartProduct.amount *  <number><any>discount;
    }
    this.cartService.totalCartPrice = <any>totalPrice.toFixed(0);
    this.cartService.totalCartDiscount = <any>totalDiscount.toFixed(0);
  }

  onClickedOutside(event) {
    this.closeFloatCart();
  }
}