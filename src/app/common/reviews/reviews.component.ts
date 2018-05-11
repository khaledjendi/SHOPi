import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, AfterViewInit {
  @ViewChild('reviewElm') reviewElm: ElementRef;
  reviews;

  averageReviewsStars = 0;
  constructor(db: AngularFireDatabase) {
    db.list('/reviews').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, value: action.payload.val() }));
    }).subscribe(items => {
      this.reviews = items.map(item => item.value);
      setTimeout(() => {
        jQuery.HSCore.components.HSCarousel.init(this.reviewElm.nativeElement);
        this.averageReviewsStars = this.getAverage();
      });
    });
   }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  getAverage() {
    let total: number = 0;
    
    for(let review of this.reviews) {
      if(review.stars) {
        
        total += review.stars;
      }
    }
    return (total/this.reviews.length)
  }

  getArray(size) {
    return new Array(size);
  }

}
