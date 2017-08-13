import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Professor} from './professor';
import {Config} from './config';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProfessorCadastroService {

  constructor(public http: HttpClient) { }

  getProfessores(): Observable<Professor[]> {
    return this.http.get<Professor[]>(Config.API_BASE + 'integracao/professores');
  }

}
