import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-completed',
  templateUrl: './order-completed.component.html',
  styleUrls: ['./order-completed.component.scss']
})
export class OrderCompletedComponent implements OnInit {
  orderKey;
  constructor(private route: ActivatedRoute) {
    this.route.queryParams
      .subscribe(params => {
        this.orderKey = params.orderKey;
      });
  }

  ngOnInit() {
  }

}
