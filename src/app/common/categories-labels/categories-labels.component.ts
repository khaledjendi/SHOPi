import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-categories-labels',
  templateUrl: './categories-labels.component.html',
  styleUrls: ['./categories-labels.component.scss']
})
export class CategoriesLabelsComponent implements OnInit {
  @Input('collection') collection; 

  constructor() { }

  ngOnInit() {
  }

}
