import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-mini-header',
  templateUrl: './common-mini-header.component.html',
  styleUrls: ['./common-mini-header.component.scss']
})
export class CommonMiniHeaderComponent implements OnInit {

  constructor(public cartService: CartService) { }

  ngOnInit() {
  }

}
