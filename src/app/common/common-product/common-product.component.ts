import { Router } from '@angular/router';
import { SessionService } from './../../services/session.service';
import { cartAnimation } from './common-product.component.animation';
import { trigger, transition, useAnimation, animate, style } from '@angular/animations';
import { CartProduct } from './../Cart';
import { CartService } from './../../services/cart.service';
import { Product } from './../Product';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-common-product',
  templateUrl: './common-product.component.html',
  styleUrls: ['./common-product.component.scss'],
  animations: [
    cartAnimation
  ]
})
export class CommonProductComponent implements OnInit {
  @Input("products") products: Product[];

  isProductDragged = false;

  addToCart($event: any) {
    let product: Product = JSON.parse($event.dragData);
    let cartProduct = new CartProduct();
    cartProduct.amount = 1;
    cartProduct.product = product;
    this.cartService.cartProducts.push(cartProduct);
  }
   
  constructor(public cartService: CartService, private sessionService: SessionService, private router:Router) { }

  ngOnInit() {
  }

  selectProduct(product) {
    this.sessionService.selectedProduct = JSON.parse(product);
    this.router.navigate(['/product-details'], {
      queryParams: { id: this.sessionService.selectedProduct.id }
    });
  }

  stringifyProduct(product) {
    return JSON.stringify(product);
  }

  dragStart() {
    this.isProductDragged = true
  }

  dragEnd() {
    setTimeout(() => {
      this.isProductDragged = false;
    }, 250);
  }
}
