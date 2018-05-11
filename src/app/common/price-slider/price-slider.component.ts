import { Component, OnInit } from '@angular/core';
import { Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-price-slider',
  templateUrl: './price-slider.component.html',
  styleUrls: ['./price-slider.component.scss']
})
export class PriceSliderComponent implements OnInit, AfterViewInit {
  @Input("currency") currency;
  @Input("min") min;
  @Input("max") max;
  @Input("priceRange") priceRange;
  @Input("sliderWidth") sliderWidth;
  @ViewChild('rangeSlider') rangeSlider: ElementRef;
   
  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    jQuery.HSCore.components.HSSlider.init(this.rangeSlider.nativeElement);
  }
}
