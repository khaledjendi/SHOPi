import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevSliderComponent } from './rev-slider.component';

describe('RevSliderComponent', () => {
  let component: RevSliderComponent;
  let fixture: ComponentFixture<RevSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
