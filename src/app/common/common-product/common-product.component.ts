import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-common-product',
  templateUrl: './common-product.component.html',
  styleUrls: ['./common-product.component.scss']
})
export class CommonProductComponent implements OnInit {
  @Input("products") products;
   
  constructor() { }

  ngOnInit() {
  }

}
