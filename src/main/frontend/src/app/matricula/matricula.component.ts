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

  inscricao: Inscricao;

  mostraDisciplinas = false;

  mostraFazerProposta = false;

  constructor(private disciplinaService: DisciplinaService,
    private flash: FlashMessagesService,
    private alunoService: AlunoService,
    private http: HttpClient) {}

  ngOnInit(): void {

    this.carregarProposta();

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
    this.mostraFazerProposta = false;
  }

  enviarProposta() {
    this.alunoService.alunoInfo()
      .flatMap(aluno => {
        console.log('Enviando proposta de matrícula para o aluno ' + aluno.nome);
        const inscricao = new Inscricao(null, aluno, this.disciplinasEscolhidas);
        return this.http.post('http://localhost:8080/matricula/inscricao', inscricao);
      })
      .subscribe((data) => {
        this.disciplinasEscolhidas = [];
        this.flash.show('Inscrição criada com sucesso', {cssClass: 'alert-success'});
        this.carregarProposta();
        this.mostraDisciplinas = false;
      },
      (error) => this.handleError(error));
  }

  carregarProposta() {
    this.alunoService.carregarProposta().subscribe(inscricao => {
      this.mostraFazerProposta = inscricao == null;
      this.inscricao = inscricao;
    },
      (error) => this.handleError(error));
  }

  handleError(err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      console.log('An error occurred:', err.error.message);
      this.flash.show(err.error.message, {cssClass: 'alert-danger'});
    } else {
      if (err.error && err.error.objectErrors) {
        err.error.objectErrors.forEach(objectError => this.flash.show(objectError.message, {cssClass: 'alert-danger', timeout: 5000}));
      } else {
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        this.flash.show(`Um erro aconteceu: ${err.message}`, {cssClass: 'alert-danger'});
      }
    }
  }

  cancelarMatricula() {
    this.alunoService.cancelarMatricula(this.inscricao.id)
      .subscribe(() => {
        this.flash.show('Cancelamento realizado com sucesso', {cssClass: 'alert-success'});
        this.inscricao = null;
        this.mostraFazerProposta = true;
      },
      (error) => this.handleError(error));
  }

}
