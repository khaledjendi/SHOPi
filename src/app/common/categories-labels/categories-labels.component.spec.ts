import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesLabelsComponent } from './categories-labels.component';

describe('CategoriesLabelsComponent', () => {
  let component: CategoriesLabelsComponent;
  let fixture: ComponentFixture<CategoriesLabelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesLabelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
