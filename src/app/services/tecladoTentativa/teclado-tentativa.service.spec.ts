import { TestBed } from '@angular/core/testing';

import { TecladoTentativaService } from './teclado-tentativa.service';

describe('TecladoTentativaService', () => {
  let service: TecladoTentativaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TecladoTentativaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
