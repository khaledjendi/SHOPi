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

  constructor() { }

  ngOnInit() {
  }

}
