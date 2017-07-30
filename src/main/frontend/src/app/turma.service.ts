import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Turma} from './turma';

@Injectable()
export class TurmaService {

  constructor(private http: HttpClient) {}

  getTurmas(): Observable<Turma[]> {
    return this.http.get<Turma[]>('http://localhost:8080/matricula/turmas');
  }
}
