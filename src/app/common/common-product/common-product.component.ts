import { Price } from './../Price';
import { ToastrService } from 'ngx-toastr';
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
  @Input("returnPageUrl") returnPageUrl: string;
  @Input("returnSubPageUrl") returnSubPageUrl: string;

  isProductDragged = false;

  addToCart($event: any) {
    let product: Product = JSON.parse($event.dragData);
    let cartProduct = new CartProduct();
    cartProduct.amount = 1;
    cartProduct.product = product;
    this.cartService.cartProducts.push(cartProduct);
    this.toast(product.name + " has been added to your cart!", "Info", "info", 3000);
  }
   
  constructor(public cartService: CartService, private sessionService: SessionService, private router:Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  selectProduct(product) {
    this.sessionService.selectedProduct = JSON.parse(product);
    this.router.navigate(['/product-details'], {
      queryParams: { 
        id: this.sessionService.selectedProduct.id,
        returnPageUrl: this.returnPageUrl,
        returnSubPageUrl: this.returnSubPageUrl
      }
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

  private toast(message, header, type, timeOut) {
    switch (type) {
      case "error":
        this.toastr.error(message, header, {
          timeOut: timeOut,
          easing: 'easeOutBounce',
          progressBar: true
        });
        break;
      case "warning":
        this.toastr.warning(message, header, {
          timeOut: timeOut,
          easing: 'easeOutBounce',
          progressBar: true
        });
        break;
      case "info":
        this.toastr.info(message, header, {
          timeOut: timeOut,
          easing: 'easeOutBounce',
          progressBar: true
        });
        break;
      case "success":
        this.toastr.success(message, header, {
          timeOut: timeOut,
          easing: 'easeOutBounce',
          progressBar: true
        });
        break;
    }
  }

  getPrice(price: Price, discount: number) {
    if (this.eligibleDiscount(discount))
      return Price.getDisountPrice(price.amount, discount, price.currencyAbbr);
    return price.formattedPrice;
  }

  private eligibleDiscount(discount: number) {
    return (discount && discount > 0);
  }
}
