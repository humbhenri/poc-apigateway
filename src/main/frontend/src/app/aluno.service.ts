import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from './authentication.service';
import {Aluno} from './aluno';

@Injectable()
export class AlunoService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

  alunoInfo(): Observable<Aluno> {
    return this.http.get<Aluno>('http://localhost:8080/matricula/alunos/' + this.authenticationService.username);
  }

}
