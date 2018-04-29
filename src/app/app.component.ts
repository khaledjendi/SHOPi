import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  onActivate(e, outlet){
    outlet.scrollTop = 0;
    window.scrollTo(0, 0);
  }
}
