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
  title: string = "title";
  isExpanded: boolean;
  isExpandedIcon: boolean;

  constructor() {

  }

  ngOnInit() {
    console.log(this.orders);
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
    if (!this.isExpanded)
      setTimeout(() => {
        this.isExpandedIcon = this.isExpanded;
      }, 300);
    else
      this.isExpandedIcon = this.isExpanded;
  }

  formatDate(strDate) {
    if (strDate.indexOf(',') !== -1)
      return strDate.split(',')[0];
    return strDate;

  }
}
