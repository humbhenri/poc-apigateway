import {Component, OnInit} from '@angular/core';
import {AlunoService} from '../aluno.service';
import {Aluno} from '../aluno';
import {DisciplinaService} from '../disciplina.service';
import {Disciplina} from '../disciplina';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Inscricao} from '../inscricao';
import {Observable} from 'rxjs/Observable';
import {FlashMessagesService} from 'angular2-flash-messages';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css'],
})
export class MatriculaComponent implements OnInit {

  disciplinasEscolhidas: Array<Disciplina> = [];

  disciplinasDisponiveis: Array<Disciplina> = [];

  proposta: any = {};

  mostraDisciplinas = false;

  constructor(private disciplinaService: DisciplinaService,
    private flash: FlashMessagesService,
    private alunoService: AlunoService,
    private http: HttpClient) {}

  ngOnInit(): void {
    this.disciplinaService.getDisciplinas().subscribe(
      data => this.disciplinasDisponiveis = data,
      error => {
        console.log(error);
        this.flash.show(error.message, {cssClass: 'alert-danger'});
      }
    );
  }

  onSelect(disciplina: Disciplina): void {
    const index = this.disciplinasEscolhidas.map(d => d.id).indexOf(disciplina.id);
    if (index > -1) {
      this.disciplinasEscolhidas.splice(index, 1);
    } else {
      this.disciplinasEscolhidas.push(disciplina);
    }
  }

  getCSSClasses(disciplina: Disciplina) {
    if (this.disciplinasEscolhidas.filter(d => d.id === disciplina.id).length > 0) {
      return 'btn btn-danger btn-sm pull-right';
    }
    return 'btn btn-primary btn-sm pull-right';
  }

  getLabel(disciplina: Disciplina) {
    if (this.disciplinasEscolhidas.filter(d => d.id === disciplina.id).length > 0) {
      return 'Remover';
    }
    return 'Matricular';
  }

  fazerProposta() {
    this.mostraDisciplinas = true;
  }

  enviarProposta() {
    this.alunoService.alunoInfo()
      .flatMap(aluno => {
        console.log('Enviando proposta de matrícula para o aluno ' + aluno.nome);
        const inscricao = new Inscricao(null, aluno, this.disciplinasEscolhidas);
        return this.http.post('http://localhost:8080/matricula/inscricao', inscricao);
      })
      .subscribe(data => console.log(data),
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      });
  }

}
