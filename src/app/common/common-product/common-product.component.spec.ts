import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonProductComponent } from './common-product.component';

describe('CommonProductComponent', () => {
  let component: CommonProductComponent;
  let fixture: ComponentFixture<CommonProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
