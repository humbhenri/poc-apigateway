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

  salvarProfessor(p: Professor) {
    return this.http.post(Config.API_BASE + 'integracao/professores', p);
  }

  deletarProfessor(p: Professor) {
    return this.http.delete(Config.API_BASE + 'integracao/professores/' + p.id);
  }

}
