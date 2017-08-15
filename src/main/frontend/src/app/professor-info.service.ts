import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Professor } from "./professor";
import { Observable } from "rxjs/Observable";
import { Config } from './config';

@Injectable()
export class ProfessorInfoService {

  constructor(private http: HttpClient) { }

  getProfessorById(id: number): Observable<Professor> {
    return this.http.get<Professor>(Config.API_BASE + '/matricula/professor/' + id);
  }

}
