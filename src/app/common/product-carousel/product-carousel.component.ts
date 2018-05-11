import { SessionService } from './../../services/session.service';
import { Router } from '@angular/router';
import { Price } from './../Price';
import { Component, OnInit } from '@angular/core';
import { Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent implements OnInit, AfterViewInit {
  @Input("carousel") carousel;
  @Input("returnPageUrl") returnPageUrl: string;
  @Input("returnSubPageUrl") returnSubPageUrl: string;

  constructor(private sessionService: SessionService, private router:Router) { }

  ngOnInit() {
  }

  @ViewChild('carouselSlider') carouselElm: ElementRef;

  ngAfterViewInit() {
    jQuery.HSCore.components.HSCarousel.init(this.carouselElm.nativeElement);

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
  getPrice(price: Price, discount: number) {
    if (this.eligibleDiscount(discount))
      return Price.getDisountPrice(price.amount, discount, price.currencyAbbr);
    return price.formattedPrice;
  }

  private eligibleDiscount(discount: number) {
    return (discount && discount > 0);
  }

  selectProduct(product) {
    this.sessionService.selectedProduct = JSON.parse(product);
    window.scrollTo(0, 0);
    if(!this.returnPageUrl) return;
    this.router.navigate(['/product-details'], {
      queryParams: { 
        id: this.sessionService.selectedProduct.id,
        returnPageUrl: this.returnPageUrl,
        returnSubPageUrl: this.returnSubPageUrl
      }
    });
  }

  stringifyProduct(product) {
    return JSON.stringify(product);
  }
}
