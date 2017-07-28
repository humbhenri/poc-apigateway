import { Component, OnInit } from '@angular/core';
import { DisciplinaService } from '../disciplina.service';
import { Disciplina } from '../disciplina';
import { Observable } from "rxjs/Observable";
import { FlashMessagesService } from 'angular2-flash-messages';
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

  constructor(private disciplinaService: DisciplinaService, private flash: FlashMessagesService) { }

  ngOnInit(): void {
    this.disciplinaService.getDisciplinas().subscribe(
      data => this.disciplinasDisponiveis = data,
      error => {
        console.log(error);
        this.flash.show(error.message, {cssClass : 'alert-danger'});
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
      return "btn btn-danger btn-sm pull-right";
    }
    return "btn btn-primary btn-sm pull-right";
  }

  getLabel(disciplina: Disciplina) {
    if (this.disciplinasEscolhidas.filter(d => d.id === disciplina.id).length > 0) {
      return "Remover";
    }
    return "Matricular";
  }

  fazerProposta() {
    this.mostraDisciplinas = true;
  }

}
