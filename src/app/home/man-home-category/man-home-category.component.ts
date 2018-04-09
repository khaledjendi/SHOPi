import { expandCollapse } from '../home-category.animations';
import { Component, OnInit, Injectable, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-man-home-category',
  templateUrl: './man-home-category.component.html',
  styleUrls: ['./man-home-category.component.scss'],
  animations: [expandCollapse]
})

export class ManHomeCategoryComponent implements OnInit {
  private menuParts = {
    newArrival: {
      isInHeader: false,
      isInContent: false
    },
    clothing: {
      isInHeader: false,
      isInContent: false
    },
    shoes: {
      isInHeader: false,
      isInContent: false
    },
    sport: {
      isInHeader: false,
      isInContent: false
    },
    accessoriesAndBags: {
      isInHeader: false,
      isInContent: false
    }
  }
  hideOverlay: boolean = true;
  type: string = "";

  constructor() {

  }

  ngOnInit() {
  }

  enterHeader(type) {
    switch (type) {
      case "newArrival":
        this.menuParts.newArrival.isInHeader = true;
        break;
      case "clothing":
        this.menuParts.clothing.isInHeader = true;
        break;
      case "shoes":
        this.menuParts.shoes.isInHeader = true;
        break;
      case "sport":
        this.menuParts.sport.isInHeader = true;
        break;
      case "accessoriesAndBags":
        this.menuParts.accessoriesAndBags.isInHeader = true;
        break;
    }
  }

  enterContent(type) {
    switch (type) {
      case "newArrival":
        this.menuParts.newArrival.isInContent = true;
        break;
      case "clothing":
        this.menuParts.clothing.isInContent = true;
        break;
      case "shoes":
        this.menuParts.shoes.isInContent = true;
        break;
      case "sport":
        this.menuParts.sport.isInContent = true;
        break;
      case "accessoriesAndBags":
        this.menuParts.accessoriesAndBags.isInContent = true;
        break;
    }
  }

  leaveHeader(type) {
    switch (type) {
      case "newArrival":
        this.menuParts.newArrival.isInHeader = false;
        break;
      case "clothing":
        this.menuParts.clothing.isInHeader = false;
        break;
      case "shoes":
        this.menuParts.shoes.isInHeader = false;
        break;
      case "sport":
        this.menuParts.sport.isInHeader = false;
        break;
      case "accessoriesAndBags":
        this.menuParts.accessoriesAndBags.isInHeader = false;
        break;
    }
  }

  leaveContent(type) {
    switch (type) {
      case "newArrival":
        this.menuParts.newArrival.isInContent = false;
        break;
      case "clothing":
        this.menuParts.clothing.isInContent = false;
        break;
      case "shoes":
        this.menuParts.shoes.isInContent = false;
        break;
      case "sport":
        this.menuParts.sport.isInContent = false;
        break;
      case "accessoriesAndBags":
        this.menuParts.accessoriesAndBags.isInContent = false;
        break;
    }
  }

  validateAnimationState(type) {
    switch (type) {
      case "newArrival":
        if (this.menuParts.newArrival.isInHeader || this.menuParts.newArrival.isInContent)
          return this.expandCollapse(false, "newArrival");
        if (!this.menuParts.newArrival.isInHeader && !this.menuParts.newArrival.isInContent)
          return this.expandCollapse(true, "newArrival");
        break;
      case "clothing":
        if (this.menuParts.clothing.isInHeader || this.menuParts.clothing.isInContent)
          return this.expandCollapse(false, "clothing");
        if (!this.menuParts.clothing.isInHeader && !this.menuParts.clothing.isInContent)
          return this.expandCollapse(true, "clothing");
        break;
      case "shoes":
        if (this.menuParts.shoes.isInHeader || this.menuParts.shoes.isInContent)
          return this.expandCollapse(false, "shoes");
        if (!this.menuParts.shoes.isInHeader && !this.menuParts.shoes.isInContent)
          return this.expandCollapse(true, "shoes");
        break;
      case "sport":
        if (this.menuParts.sport.isInHeader || this.menuParts.sport.isInContent)
          return this.expandCollapse(false, "sport");
        if (!this.menuParts.sport.isInHeader && !this.menuParts.sport.isInContent)
          return this.expandCollapse(true, "sport");
        break;
      case "accessoriesAndBags":
        if (this.menuParts.accessoriesAndBags.isInHeader || this.menuParts.accessoriesAndBags.isInContent)
          return this.expandCollapse(false, "accessoriesAndBags"); // expand
        if (!this.menuParts.accessoriesAndBags.isInHeader && !this.menuParts.accessoriesAndBags.isInContent)
          return this.expandCollapse(true, "accessoriesAndBags"); // colapse
        break;
    }
  }

  expandCollapse(bool, type?) {
    if (!bool) {
      if (this.type !== type) {
        this.type = type;
        this.onMenuItemChanged(bool)
      }
    }
    else {
      if (this.type === type) {
        this.onMenuItemChanged(bool)
      }
    }
    return !bool ? 'expanded' : 'collapsed'
  }

  onMenuItemChanged(hideOverlay) {
    setTimeout(() => {
      this.hideOverlay = hideOverlay;
      this.type = "";
    }, 250);

  }
}
