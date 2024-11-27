import { TestBed } from '@angular/core/testing';

import { PalavrasBancoService } from './palavras-banco.service';

describe('PalavrasBancoService', () => {
  let service: PalavrasBancoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PalavrasBancoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
