import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCompletedComponent } from './order-completed.component';

describe('OrderCompletedComponent', () => {
  let component: OrderCompletedComponent;
  let fixture: ComponentFixture<OrderCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
