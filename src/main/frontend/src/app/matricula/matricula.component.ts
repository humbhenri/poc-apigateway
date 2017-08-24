import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../aluno.service';
import { Aluno } from '../aluno';
import { DisciplinaService } from '../disciplina.service';
import { Disciplina } from '../disciplina';
import { Horario } from '../horario';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inscricao } from '../inscricao';
import { Observable } from 'rxjs/Observable';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Turma } from '../turma';
import { TurmaService } from '../turma.service';
import { Config } from "../config";
import 'rxjs/Rx';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css'],
  animations: [
    trigger('turmaState', [
      state('inactive', style({
        backgroundColor: '#286090',
        transform: 'scale(1)',
        'border-color': '#2e6da4',        
      })),
      state('active',   style({
        backgroundColor: '#d9534f',
        transform: 'scale(1.1)',
        'border-color': '#d9534f',
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ],
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
    private http: HttpClient) { }

  ngOnInit(): void {

    this.carregarProposta();

    this.turmaService.getTurmas().subscribe(
      data => this.turmasDisponiveis = data,
      error => {
        console.log(error);
        this.flash.show('Não foi possível obter as turmas disponíveis, tente novamente mais tarde', { cssClass: 'alert-danger', timeout: 5000 });
      }
    );
  }

  onSelect(turma: Turma): void {
    turma.selecionado = !turma.selecionado;
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
        return this.http.post(Config.API_BASE + 'matricula/inscricao', inscricao);
      })
      .subscribe((data) => {
        this.turmasEscolhidas = [];
        window.scrollTo(0, 0);
        this.flash.show('Inscrição criada com sucesso', { cssClass: 'alert-success' });
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
      this.flash.show('Ocorreu um erro, tente novamente mais tarde.', { cssClass: 'alert-danger' });
    } else {
      if (err.error && err.error.objectErrors) {
        window.scrollTo(0, 0);
        err.error.objectErrors.forEach(objectError => this.flash.show(objectError.message, { cssClass: 'alert-danger', timeout: 5000 }));
      } else {
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        this.flash.show(`Um erro aconteceu: ${err.message}`, { cssClass: 'alert-danger' });
      }
    }
  }

  cancelarMatricula() {
    this.alunoService.cancelarMatricula(this.inscricao.id)
      .subscribe(() => {
        this.flash.show('Cancelamento realizado com sucesso', { cssClass: 'alert-success' });
        this.inscricao = null;
        this.mostraFazerProposta = true;
      },
      (error) => this.handleError(error));
  }

  getHorarios(turma: Turma): Horario[] {
    return turma.horarios.sort((a, b) => {
      if (a.dia.id - b.dia.id === 0) {
        return a.hora - b.hora;
      }
      return a.dia.id - b.dia.id;
    });
  }

}
