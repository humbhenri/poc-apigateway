import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';
import { Professor } from './professor';
import { Turma } from './turma';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AvaliacaoService {

  private nomeTurma = new BehaviorSubject<string>("");

  nomeTurmaAtual = this.nomeTurma.asObservable();

  constructor(private http: HttpClient) { }

  mudaNomeTurma(nome: string) {
    this.nomeTurma.next(nome);
  }

  getTurma(professor: string): Observable<Turma[]> {
    return this.http.get<Turma[]>(Config.API_BASE + 'cursos/turmas/search/findTurmaByProfessorUsername?username=' + professor)
      .map((obj: any) => obj.content);    
  }

  getNotasByTurma(id: number): Observable<Object[]> {
    return this.http.get<Object[]>(Config.API_BASE + 'cursos/notas/search/findByTurmaId?id=' + id)
    .map((obj: any) => obj.content);
  }

  getTurmaById(id: number): Observable<Turma> {
    return this.http.get<Turma>(Config.API_BASE + 'cursos/turmas/' + id);
  }

  getNotaById(id: number): Observable<Object> {
    return this.http.get(Config.API_BASE + 'cursos/notas/' + id);
  }

  salvaNota(nota: any): Observable<Object> {
    return this.http.patch(Config.API_BASE + 'cursos/notas/' + nota.id, {nota: nota.nota});
  }

}
