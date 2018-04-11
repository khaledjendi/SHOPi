import { Component, OnInit } from '@angular/core';
import { Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent implements OnInit, AfterViewInit {
  @Input() carousel;

  constructor() { }

  ngOnInit() {
    //console.log(this.carousel);
  }

  @ViewChild('carouselSlider') carouselElm: ElementRef;

  ngAfterViewInit() {
    //jQuery(this.carousel.nativeElement)
    jQuery.HSCore.components.HSCarousel.init('[class*="js-carousel"]');

    jQuery(this.carouselElm.nativeElement).slick('setOption', 'responsive', [{
      breakpoint: 1200,
      settings: {
        slidesToShow: 4
      }
    }, {
      breakpoint: 992,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 2
      }
    }], true);
  }

}
