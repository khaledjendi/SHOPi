import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomanHomeCategoryComponent } from './woman-home-category.component';

describe('WomanHomeCategoryComponent', () => {
  let component: WomanHomeCategoryComponent;
  let fixture: ComponentFixture<WomanHomeCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomanHomeCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomanHomeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
