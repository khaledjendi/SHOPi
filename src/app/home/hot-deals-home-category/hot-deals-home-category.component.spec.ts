import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotDealsHomeCategoryComponent } from './hot-deals-home-category.component';

describe('HotDealsHomeCategoryComponent', () => {
  let component: HotDealsHomeCategoryComponent;
  let fixture: ComponentFixture<HotDealsHomeCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotDealsHomeCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotDealsHomeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
