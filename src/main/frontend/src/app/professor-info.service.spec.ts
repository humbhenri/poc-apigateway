import { TestBed, inject } from '@angular/core/testing';

import { ProfessorInfoService } from './professor-info.service';

describe('ProfessorInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfessorInfoService]
    });
  });

  it('should be created', inject([ProfessorInfoService], (service: ProfessorInfoService) => {
    expect(service).toBeTruthy();
  }));
});
