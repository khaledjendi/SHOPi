import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPaymentOptionsComponent } from './user-payment-options.component';

describe('UserPaymentOptionsComponent', () => {
  let component: UserPaymentOptionsComponent;
  let fixture: ComponentFixture<UserPaymentOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPaymentOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPaymentOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
