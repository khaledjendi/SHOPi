import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address } from './../common/address';
import { Order } from './../common/order';
import { LoginAuthService } from './../services/login-auth.service';
import { CheckoutDialogComponent } from './dialog/checkout-dialog.component';
import { LoginErrorStateMatcher } from './../login-auth/login/login.component';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { paymentDescAnimation } from './checkout.component.animations';
import { Price } from './../common/Price';
import { CartProduct } from './../common/Cart';
import { CartService } from './../services/cart.service';
import { MatTableDataSource, MatDialog, MAT_DRAWER_DEFAULT_AUTOSIZE } from '@angular/material';
import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase'

export enum PaymentMethod {
  Card,
  KlarnaPayLater,
  Paypal
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations: [paymentDescAnimation]
})
export class CheckoutComponent implements OnInit {
  displayedColumns = ['item', 'price', 'details', 'remove'];
  dataSource = new MatTableDataSource();

  payment: PaymentMethod = PaymentMethod.KlarnaPayLater;
  submitButton = {
    html: "Checkout",
    disabled: false
  }

  payments = [{
    method: PaymentMethod.Card,
    title: 'Credit Card',
    img: '../../assets/img/cart/card_icon.png'
  }, {
    method: PaymentMethod.KlarnaPayLater,
    title: 'Klarna - Pay Later',
    img: 'https://cdn.klarna.com/1.0/shared/image/generic/badge/en_gb/pay_later/standard/pink.svg'
  }, {
    method: PaymentMethod.Paypal,
    title: 'PayPal',
    img: 'https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg',
    description: `When you place your order, the amount will be withdrawn from your PayPal account. No extra charges will be added. Please note! the address used in PayPal must be the same as the delivery address below.`
  }];

  checkoutForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required
    ]),
    lastName: new FormControl('', [
      Validators.required
    ]),
    address: new FormControl('', [
      Validators.required
    ]),
    address2: new FormControl('', [
    ]),
    postalCode: new FormControl('', [
      Validators.required
    ]),
    city: new FormControl('', [
      Validators.required
    ]),
    country: new FormControl('', [
      Validators.required
    ]),
    phoneNumber: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    agreement: new FormControl(false)
  })

  countries = ["sweden", "norway", "denmark"];

  get firstName() {
    return this.checkoutForm.get('firstName')
  }

  get lastName() {
    return this.checkoutForm.get('lastName')
  }

  get address() {
    return this.checkoutForm.get('address')
  }

  get address2() {
    return this.checkoutForm.get('address2')
  }

  get postalCode() {
    return this.checkoutForm.get('postalCode')
  }

  get city() {
    return this.checkoutForm.get('city')
  }

  get country() {
    return this.checkoutForm.get('country')
  }

  get phoneNumber() {
    return this.checkoutForm.get('phoneNumber')
  }

  get email() {
    return this.checkoutForm.get('email')
  }

  get agreement() {
    return this.checkoutForm.get('agreement')
  }

  matcher = new LoginErrorStateMatcher();
  phonePrefix = "";

  constructor(public cartService: CartService, public dialog: MatDialog, public loginAuthService: LoginAuthService, private toastr: ToastrService, private router: Router) {
    this.dataSource.filterPredicate =
      (data: CartProduct, filter: string) => {
        let bool = data.product.name.toLowerCase().indexOf(filter) != -1 ||
          data.product.price.amount.toString().toLowerCase().indexOf(filter) != -1
        return bool;
      };
  }

  ngOnInit() {
    this.getTotal();
    this.dataSource.data = this.cartService.cartProducts;
  }

  countryChange(country) {
    switch (country) {
      case "sweden":
        this.phonePrefix = "+46";
        break;
      case "norway":
        this.phonePrefix = "+47";
        break;
      case "denmark":
        this.phonePrefix = "+45";
        break;
    }
  }

  paymentChange(event) {
    if (event.value === PaymentMethod.Card) {

    }
  }

  getWindowHeight() {
    let body = document.body, html = document.documentElement;
    return Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight) + "px";
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
      return Price.getDisountPrice(price.amount, discount, price.currencyAbbr ? price.currencyAbbr : "");
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
    for (let cartProduct of this.cartService.cartProducts) {
      let price = Price.getDisountPrice(cartProduct.product.price.amount, cartProduct.product.discount, "", 2, true);
      let discount = Price.getDisount(cartProduct.product.price.amount, cartProduct.product.discount, "", 2, true)
      totalPrice += cartProduct.amount * <number><any>price;
      totalDiscount += cartProduct.amount * <number><any>discount;
    }
    this.cartService.totalCartPrice = <any>totalPrice.toFixed(0);
    this.cartService.totalCartDiscount = <any>totalDiscount.toFixed(0);
  }

  onSubmit() {
    console.log(this.checkoutForm.valid, this.checkoutForm)
    if (this.checkoutForm.valid) {
      this.openDialog();
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CheckoutDialogComponent, {
      width: '500px',
      data: { name: this.loginAuthService.currentUserDisplayName, src: this.loginAuthService.currentUserPhotoURL }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result === "confirm") {
        this.disbaleSubmit();
        let firstName = <string><any>this.checkoutForm.value.firstName;
        let lastName = <string><any>this.checkoutForm.value.lastName;
        let address = <string><any>this.checkoutForm.value.address;
        let address2 = <string><any>this.checkoutForm.value.address2;
        let postalCode = <string><any>this.checkoutForm.value.postalCode;
        let city = <string><any>this.checkoutForm.value.city;
        let country = <string><any>this.checkoutForm.value.country;
        let phoneNumber = <string><any>this.checkoutForm.value.phoneNumber;
        let email = <string><any>this.checkoutForm.value.email;
        let addressObj = new Address(firstName, lastName, address, address2 ? address2 : "", postalCode, city, country, phoneNumber, email);
        let id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
        let date = new Date(Date.now()).toLocaleString('en-SE', { timeZone: 'UTC' })
        let userId = this.loginAuthService.currentUserId;

        let order = new Order(userId, this.cartService.cartProducts, this.cartService.totalCartPrice, this.cartService.totalCartDiscount, "kr", addressObj, date, PaymentMethod[this.payment]);

        let orderRef = firebase.database().ref(`orders`).push();
        orderRef.set(order).then(() => {
          this.cartService.cartProducts = [];
          this.cartService.totalCartPrice = 0;
          this.cartService.totalCartDiscount = 0;
          this.cartService.saveCart();
          this.router.navigate(['/order-completed'], {
            queryParams: {
              orderKey: orderRef.key
            }
          });
          this.enableSubmit();
        }).catch(error => {
          this.enableSubmit();
          this.toastr.error('Unexpected error while processing order. Admin is notified. Please try again later', 'Error', {
            timeOut: 5000,
            easing: 'easeOutBounce',
            progressBar: true,
            positionClass: 'toast-top-full-width'
          });
          //   // save error in the log [future work...]
        });
      }
    });
  }


  private enableSubmit() {
    this.submitButton.disabled = false;
    this.submitButton.html = "Checkout";
  }

  private disbaleSubmit() {
    this.submitButton.disabled = true;
    this.submitButton.html = "Processing...";
  }
}
