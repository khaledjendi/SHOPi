import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsHomeCategoryComponent } from './kids-home-category.component';

describe('KidsHomeCategoryComponent', () => {
  let component: KidsHomeCategoryComponent;
  let fixture: ComponentFixture<KidsHomeCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KidsHomeCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KidsHomeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
