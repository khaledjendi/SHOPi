import { TestBed, inject } from '@angular/core/testing';

import { ProductsDataService } from './products-data.service';

describe('ProductsDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsDataService]
    });
  });

  it('should be created', inject([ProductsDataService], (service: ProductsDataService) => {
    expect(service).toBeTruthy();
  }));
});
