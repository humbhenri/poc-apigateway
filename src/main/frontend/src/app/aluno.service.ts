import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from './authentication.service';
import {Aluno} from './aluno';
import {Inscricao} from './inscricao';
import {Config} from './config';

@Injectable()
export class AlunoService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

  alunoInfo(): Observable<Aluno> {
    return this.http.get<Aluno>(Config.API_BASE + 'matricula/alunos/' + this.authenticationService.username);
  }

  carregarProposta(): Observable<Inscricao> {
    return this.http.get<Inscricao>(Config.API_BASE + 'matricula/inscricao/' + this.authenticationService.username);
  }

  cancelarMatricula(id: number): Observable<any> {
    return this.http.delete(Config.API_BASE + 'matricula/inscricao/' + id);
  }

}
