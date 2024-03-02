import { TestBed } from '@angular/core/testing';

import { ProdutcService } from './produtc.service';

describe('ProdutcService', () => {
  let service: ProdutcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
