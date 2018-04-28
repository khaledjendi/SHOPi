import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavViewComponent } from './fav-view.component';

describe('FavViewComponent', () => {
  let component: FavViewComponent;
  let fixture: ComponentFixture<FavViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
