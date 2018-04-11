import { Component, OnInit } from '@angular/core';
import { PageType } from '../common/common-header/common-header.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  page: PageType = PageType.Men;

  constructor() { }

  ngOnInit() {
  }

  onHeaderChanged(page: PageType) {
    this.page = page;
  }
}
