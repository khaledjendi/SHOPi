import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export enum PageType {
  Home = 0,
  Man = 1,
  Woman = 2,
  Kids = 3,
  Deals = 4
}

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  @Output() change = new EventEmitter();
  activeLinks = {
    isHomeActive: true,
    isManActive: false,
    isWomanActive: false,
    isKidsActive: false,
    isHotDealsActive: false
  }

  constructor() { }

  ngOnInit() {
  }

  changePage(type) {
    switch (type) {
      case 'home':
        if (this.activeLinks.isHomeActive) break;
        this.activeLinks = {
          isHomeActive: true,
          isManActive: false,
          isWomanActive: false,
          isKidsActive: false,
          isHotDealsActive: false
        }
        this.change.emit(PageType.Home);
        break;
        case 'man':
        if (this.activeLinks.isManActive) break;
        this.activeLinks = {
          isHomeActive: false,
          isManActive: true,
          isWomanActive: false,
          isKidsActive: false,
          isHotDealsActive: false
        }
        this.change.emit(PageType.Man);
        break;
        case 'woman':
        if (this.activeLinks.isWomanActive) break;
        this.activeLinks = {
          isHomeActive: false,
          isManActive: false,
          isWomanActive: true,
          isKidsActive: false,
          isHotDealsActive: false
        }
        this.change.emit(PageType.Woman);
        break;
        case 'kids':
        if (this.activeLinks.isKidsActive) break;
        this.activeLinks = {
          isHomeActive: false,
          isManActive: false,
          isWomanActive: false,
          isKidsActive: true,
          isHotDealsActive: false
        }
        this.change.emit(PageType.Kids);
        break;
        case 'deals':
        if (this.activeLinks.isHotDealsActive) break;
        this.activeLinks = {
          isHomeActive: false,
          isManActive: false,
          isWomanActive: false,
          isKidsActive: false,
          isHotDealsActive: true
        }
        this.change.emit(PageType.Deals);
        break;
    }
  }


}
