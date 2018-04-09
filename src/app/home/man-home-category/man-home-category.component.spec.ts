import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManHomeCategoryComponent } from './man-home-category.component';

describe('HomeCategoryNavComponent', () => {
  let component: ManHomeCategoryComponent;
  let fixture: ComponentFixture<ManHomeCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManHomeCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManHomeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
