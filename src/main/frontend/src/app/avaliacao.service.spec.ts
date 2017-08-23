import { TestBed, inject } from '@angular/core/testing';

import { AvaliacaoService } from './avaliacao.service';

describe('AvaliacaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvaliacaoService]
    });
  });

  it('should be created', inject([AvaliacaoService], (service: AvaliacaoService) => {
    expect(service).toBeTruthy();
  }));
});
