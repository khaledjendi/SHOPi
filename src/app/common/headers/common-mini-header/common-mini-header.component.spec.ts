import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonMiniHeaderComponent } from './common-mini-header.component';

describe('CommonMiniHeaderComponent', () => {
  let component: CommonMiniHeaderComponent;
  let fixture: ComponentFixture<CommonMiniHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonMiniHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonMiniHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
