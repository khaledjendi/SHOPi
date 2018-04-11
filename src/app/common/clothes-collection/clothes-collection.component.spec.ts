import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothesCollectionComponent } from './clothes-collection.component';

describe('ClothesCollectionComponent', () => {
  let component: ClothesCollectionComponent;
  let fixture: ComponentFixture<ClothesCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClothesCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothesCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
