import { LoginErrorStateMatcher } from './../../login-auth/login/login.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-payment-options',
  templateUrl: './user-payment-options.component.html',
  styleUrls: ['./user-payment-options.component.scss']
})
export class UserPaymentOptionsComponent implements OnInit {
  cards = [
    {
      no: '**** **** **** 5021',
      background: 'rgba(144, 238, 144, 0.6)'
    }, {
      no: '**** **** **** 3891',
      background: 'rgba(255, 192, 203, 0.6)'
    }, {
      no: '**** **** **** 9461',
      background: 'rgba(244, 164, 96, 0.6)'
    }]

  addCardForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    number: new FormControl('', [
      Validators.required,
      Validators.minLength(16)
    ]),
    month: new FormControl('', [
      Validators.required
    ]),
    year: new FormControl('', [
      Validators.required
    ])
  });

  matcher = new LoginErrorStateMatcher();

  get name() {
    return this.addCardForm.get('name')
  }

  get number() {
    return this.addCardForm.get('number')
  }

  get month() {
    return this.addCardForm.get('month')
  }

  get year() {
    return this.addCardForm.get('year')
  }

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {

    if (this.addCardForm.valid) {
      let number = this.addCardForm.get('number').value;

      this.cards.push({
        no: this.formatCard(number),
        background: 'rgba(' + (Math.floor(Math.random() * 256) + 70) + ',' + (Math.floor(Math.random() * 256) + 70) + ',' + (Math.floor(Math.random() * 256) + 70) + ',0.6)'
      })
    }
  }

  formatCard(number) {
    if (number.length >= 16) {
      let formattedNumber = "";
      for (let i = 0; i < number.length; i++) {
        formattedNumber = (i !== 0 && (i % 4) === 0) ? formattedNumber + " " : formattedNumber;
        formattedNumber = i < 12 ? formattedNumber + "*" : formattedNumber + number[i];
      }
      return formattedNumber;
    }
    return number;
  }

}
