import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activeLinks = {
    isHomeActive: true,
    isManActive: false,
    isWomanActive: false,
    isKidsActive: false,
    isHotDealsActive: false
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
        break;
    }
  }
  tabclicked(tab) {
    alert("sd");
  }
}
