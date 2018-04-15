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
  @Output("selectedProduct") selectedProduct = new EventEmitter(); 
  isProductDragged = false;

  addToCart($event: any) {
    let product: Product = JSON.parse($event.dragData);
    let cartProduct = new CartProduct();
    cartProduct.amount = 1;
    cartProduct.product = product;
    this.cartService.cartProducts.push(cartProduct);
  }
   
  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  selectProduct(product) {
    this.selectedProduct.emit(product);
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
