import { Injectable } from '@angular/core';
import { Disciplina } from './disciplina';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class DisciplinaService {

  constructor(private http: HttpClient) { }

  getDisciplinas(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>('http://localhost:8080/matricula/disciplinas');
  }

}
