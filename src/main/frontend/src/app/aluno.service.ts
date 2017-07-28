import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class AlunoService {

  constructor(private http: HttpClient) { }
  alunoInfo(): Observable<string> {
    return this.http.get<string>("http://localhost:9091/aluno")
  }

}
