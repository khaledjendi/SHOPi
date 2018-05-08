import { ProductsDataService } from './../../services/products-data.service';
import { ProductsService } from './../../services/products.service';
import { Price } from './../Price';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SessionService } from './../../services/session.service';
import { cartAnimation } from '../animation/cart.animation';
import { trigger, transition, useAnimation, animate, style } from '@angular/animations';
import { CartProduct } from './../Cart';
import { CartService } from './../../services/cart.service';
import { Product } from './../Product';
import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-common-product',
  templateUrl: './common-product.component.html',
  styleUrls: ['./common-product.component.scss'],
  animations: [
    cartAnimation
  ]
})
export class CommonProductComponent {
  products: Product[] = [];
  @Input("returnPageUrl") returnPageUrl: string;
  @Input("returnSubPageUrl") returnSubPageUrl: string;
  @ViewChild('droppedProducts') private droppedProducts: ElementRef;

  isProductDragged = false;

  constructor(public cartService: CartService, private sessionService: SessionService, private router: Router, private toastr: ToastrService, private productsService: ProductsService, private productsDataService: ProductsDataService) {
    this.productsDataService.productsData.subscribe((filteredData) => {
      this.filterProducts(filteredData);
    })
  }

  dropProductSuccess($event: any) {
    let product: Product = JSON.parse($event.dragData);
    this.addToCart(product, false);
  }

  addToCartClicked(event, product) {
    event.stopPropagation();
    this.addToCart(product, true);
  }

  private addToCart(product: Product, openFloatCart: boolean) {
    for (let inCartProduct of this.cartService.cartProducts) {
      if (inCartProduct.product.id === product.id) {
        //inCartProduct.amount++;
        this.toast(product.name + " is already in your cart!", "Warning", "warning", 2500);
        return;
      }
    }

    let cartProduct = new CartProduct();
    cartProduct.amount = 1;
    cartProduct.product = product;
    this.cartService.cartProducts.push(cartProduct);
    this.cartService.saveCart();
    if (openFloatCart) this.cartService.setFloatCartView(true);
  }

  private filterProducts(filteredData: any) {
    // this method requires optimization!!! [future work.....]
    let filteredProducts: Product[] = [];
    let isFilteredBrands = filteredData.filteredBrands && filteredData.filteredBrands.length > 0;
    let isFilteredColors = filteredData.filteredColors && filteredData.filteredColors.length > 0;
    if (isFilteredBrands) {
      //lets remove products that are not selected
      for (let brandId of filteredData.filteredBrands) {
        let i = filteredData.products.length;
        while (i--) {
          if (filteredData.products[i].brands[0].id === brandId) {
            filteredProducts.push(filteredData.products[i]);
          }
        }
      }
    }
    if (isFilteredColors) {
      if (isFilteredBrands) {
        //lets filter the filtered brands !!!
        let tmpFilteredProducts: Product[] = [];
        for (let colorCode of filteredData.filteredColors) {
          let i = filteredProducts.length;
          while (i--) {
            if (filteredProducts[i].colorCode === colorCode) {
              tmpFilteredProducts.push(filteredProducts[i]);
            }
          }
        }
        filteredProducts = tmpFilteredProducts.slice(0);
      }
      else {
        for (let colorCode of filteredData.filteredColors) {
          let i = filteredData.products.length;
          while (i--) {
            if (filteredData.products[i].colorCode === colorCode) {
              filteredProducts.push(filteredData.products[i]);
            }
          }
        }
      }
    }
    //lets filter based on selected price
    if (isFilteredBrands || isFilteredColors) {
      let tmpFilteredProducts: Product[] = [];
      for (let product of filteredProducts) {
        let actualPrice = this.getPriceNumber(product.price, product.discount);
        if (actualPrice >= filteredData.price[0] && actualPrice <= filteredData.price[1]) {
          tmpFilteredProducts.push(product);
        }
      }
      filteredProducts = tmpFilteredProducts;
    }
    else {
      for (let product of filteredData.products) {
        let actualPrice = this.getPriceNumber(product.price, product.discount);
        if (actualPrice >= filteredData.price[0] && actualPrice <= filteredData.price[1]) {
          filteredProducts.push(product);
        }
      }
    }
    this.products = filteredProducts;
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
      try {
        this.droppedProducts.nativeElement.scrollTop = this.droppedProducts.nativeElement.scrollHeight;
      } catch (err) { }
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

  getPriceNumber(price: Price, discount: number) {
    if (this.eligibleDiscount(discount))
      return Price.getDisountPrice(price.amount, discount, "", 2, true);
    return price.amount;
  }

  private eligibleDiscount(discount: number) {
    return (discount && discount > 0);
  }
}
