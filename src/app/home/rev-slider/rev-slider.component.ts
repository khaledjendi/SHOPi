import { Component, OnInit } from '@angular/core';

import { Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-rev-slider',
  templateUrl: './rev-slider.component.html',
  styleUrls: ['./rev-slider.component.scss']
})
export class RevSliderComponent implements OnInit, AfterViewInit {
  @Input() slides;

  constructor() { 
  }

  ngOnInit() {
  }

  @ViewChild('slider') slider: ElementRef;

  ngAfterViewInit() {
    jQuery(this.slider.nativeElement).revolution({
      sliderType: "standard",
      jsFileLocation: "revolution/js/",
      sliderLayout: "auto",
      dottedOverlay: "none",
      delay: 9000,
      navigation: {
        keyboardNavigation: "off",
        keyboard_direction: "horizontal",
        mouseScrollNavigation: "off",
        mouseScrollReverse: "default",
        onHoverStop: "on",
        touch: {
          touchenabled: "on",
          swipe_threshold: 75,
          swipe_min_touches: 50,
          swipe_direction: "horizontal",
          drag_block_vertical: false
        }
        ,
        arrows: {
          style: "gyges",
          enable: true,
          hide_onmobile: false,
          hide_onleave: false,
          tmp: '',
          left: {
            h_align: "right",
            v_align: "bottom",
            h_offset: 40,
            v_offset: 0
          },
          right: {
            h_align: "right",
            v_align: "bottom",
            h_offset: 0,
            v_offset: 0
          }
        }
      },
      responsiveLevels: [1240, 1024, 778, 480],
      visibilityLevels: [1240, 1024, 778, 480],
      gridwidth: [1200, 1024, 778, 480],
      gridheight: [600, 600, 600, 600],
      lazyType: "single",
      parallax: {
        type: "scroll",
        origo: "slidercenter",
        speed: 400,
        levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55]
      },
      shadow: 0,
      spinner: 'spinner0',
      stopLoop: "off",
      stopAfterLoops: -1,
      stopAtSlide: -1,
      shuffle: "off",
      autoHeight: "off",
      disableProgressBar: "on",
      hideThumbsOnMobile: "off",
      hideSliderAtLimit: 0,
      hideCaptionAtLimit: 0,
      hideAllCaptionAtLilmit: 0,
      debugMode: false,
      fallbacks: {
        simplifyAll: "off",
        nextSlideOnWindowFocus: "off",
        disableFocusListener: false,
      }
    });
  }

}
