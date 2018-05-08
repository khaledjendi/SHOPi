import { CartProduct } from './../../common/Cart';
import { Price } from './../../common/Price';
import { MatTableDataSource } from '@angular/material';
import { orderExpandCollapse } from './user-orders.component.animations';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss'],
  animations: [orderExpandCollapse]
})

export class UserOrdersComponent implements OnInit {
  @Input("orders") orders;
  ordersPeriod = "3"; // 3 months
  displayedColumns = ['item', 'price', 'details'];


  constructor() {

  }

  ngOnInit() {
  }

  toggle(order) {
    order.animation = !order.animation;
    if (!order.animation)
      setTimeout(() => {
        order.animationIcon = order.animation;
      }, 300);
    else
      order.animationIcon = order.animation;
  }

  formatDate(strDate) {
    if (strDate.indexOf(',') !== -1)
      return strDate.split(',')[0];
    return strDate;
  }

  getWindowHeight() {
    let body = document.body, html = document.documentElement;
    return Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight) + "px";
  }

  applyFilter(filterValue: string, dataSource) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    dataSource.filter = filterValue;
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
