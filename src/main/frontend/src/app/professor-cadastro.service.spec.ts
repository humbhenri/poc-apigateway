import { TestBed, inject } from '@angular/core/testing';

import { ProfessorCadastroService } from './professor-cadastro.service';

describe('ProfessorCadastroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfessorCadastroService]
    });
  });

  it('should be created', inject([ProfessorCadastroService], (service: ProfessorCadastroService) => {
    expect(service).toBeTruthy();
  }));
});
