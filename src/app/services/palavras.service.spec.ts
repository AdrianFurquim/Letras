import { TestBed } from '@angular/core/testing';

import { PalavrasService } from './palavras.service';

describe('PalavrasService', () => {
  let service: PalavrasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PalavrasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
