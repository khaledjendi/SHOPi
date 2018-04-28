import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private af: AngularFireAuth) {
    af.auth.signOut();
  }

  ngOnInit() {
  }

  onActivate(e, outlet){
    outlet.scrollTop = 0;
    window.scrollTo(0, 0);
  }
}
