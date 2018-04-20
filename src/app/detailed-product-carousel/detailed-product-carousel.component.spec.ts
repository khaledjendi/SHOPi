import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedProductCarouselComponent } from './detailed-product-carousel.component';

describe('DetailedProductCarouselComponent', () => {
  let component: DetailedProductCarouselComponent;
  let fixture: ComponentFixture<DetailedProductCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedProductCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedProductCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
