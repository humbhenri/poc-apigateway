import {Component, OnInit} from '@angular/core';
import {AlunoService} from '../aluno.service';
import {Aluno} from '../aluno';
import {DisciplinaService} from '../disciplina.service';
import {Disciplina} from '../disciplina';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Inscricao} from '../inscricao';
import {Observable} from 'rxjs/Observable';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Turma} from '../turma';
import {TurmaService} from '../turma.service';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css'],
})
export class MatriculaComponent implements OnInit {

  turmasEscolhidas: Array<Turma> = [];

  turmasDisponiveis: Array<Turma> = [];

  inscricao: Inscricao;

  mostraTurmas = false;

  mostraFazerProposta = false;

  constructor(private turmaService: TurmaService,
    private flash: FlashMessagesService,
    private alunoService: AlunoService,
    private http: HttpClient) {}

  ngOnInit(): void {

    this.carregarProposta();

    this.turmaService.getTurmas().subscribe(
      data => this.turmasDisponiveis = data,
      error => {
        console.log(error);
        this.flash.show(error.message, {cssClass: 'alert-danger'});
      }
    );
  }

  onSelect(turma: Turma): void {
    const index = this.turmasEscolhidas.map(d => d.id).indexOf(turma.id);
    if (index > -1) {
      this.turmasEscolhidas.splice(index, 1);
    } else {
      this.turmasEscolhidas.push(turma);
    }
  }

  getCSSClasses(turma: Turma) {
    if (this.turmasEscolhidas.filter(d => d.id === turma.id).length > 0) {
      return 'btn btn-danger btn-sm pull-right';
    }
    return 'btn btn-primary btn-sm pull-right';
  }

  getLabel(turma: Turma) {
    if (this.turmasEscolhidas.filter(d => d.id === turma.id).length > 0) {
      return 'Remover';
    }
    return 'Matricular';
  }

  fazerProposta() {
    this.mostraTurmas = true;
    this.mostraFazerProposta = false;
  }

  enviarProposta() {
    this.alunoService.alunoInfo()
      .flatMap(aluno => {
        console.log('Enviando proposta de matrícula para o aluno ' + aluno.nome);
        const inscricao = new Inscricao(null, aluno, this.turmasEscolhidas);
        return this.http.post('http://localhost:8080/matricula/inscricao', inscricao);
      })
      .subscribe((data) => {
        this.turmasEscolhidas = [];
        this.flash.show('Inscrição criada com sucesso', {cssClass: 'alert-success'});
        this.carregarProposta();
        this.mostraTurmas = false;
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
