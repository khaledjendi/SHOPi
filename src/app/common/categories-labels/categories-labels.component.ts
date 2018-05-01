import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-categories-labels',
  templateUrl: './categories-labels.component.html',
  styleUrls: ['./categories-labels.component.scss']
})
export class CategoriesLabelsComponent {
  @Input('collection') collection; 
  @Output('click') click = new EventEmitter();

  constructor() { }

  getProducts(event, label:string) {
    event.stopPropagation();
    this.click.emit(label.toLocaleLowerCase())
  }

}
