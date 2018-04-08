import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCategoryNavComponent } from './home-category-nav.component';

describe('HomeCategoryNavComponent', () => {
  let component: HomeCategoryNavComponent;
  let fixture: ComponentFixture<HomeCategoryNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCategoryNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCategoryNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
