import { Component, OnInit } from '@angular/core';
import { PageType } from './home-header/home-header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  page: PageType = PageType.Home;
  constructor() { }

  ngOnInit() {
  }

  onHeaderChanged(page: PageType) {
    this.page = page;
  }
}
