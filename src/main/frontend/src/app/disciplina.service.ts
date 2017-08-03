import { Injectable } from '@angular/core';
import { Disciplina } from './disciplina';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Config } from './config';

@Injectable()
export class DisciplinaService {

  constructor(private http: HttpClient) { }

  getDisciplinas(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(Config.API_BASE + 'matricula/disciplinas');
  }

}
