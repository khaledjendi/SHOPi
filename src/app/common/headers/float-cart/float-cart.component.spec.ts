import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatCartComponent } from './float-cart.component';

describe('FloatCartComponent', () => {
  let component: FloatCartComponent;
  let fixture: ComponentFixture<FloatCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
