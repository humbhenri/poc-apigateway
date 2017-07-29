import {Component, OnInit} from '@angular/core';
import {AlunoService} from '../aluno.service';
import {Aluno} from '../aluno';
import {Disciplina} from '../disciplina';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-aluno-info',
  templateUrl: './aluno-info.component.html',
  styleUrls: ['./aluno-info.component.css']
})
export class AlunoInfoComponent implements OnInit {

  disciplinasFeitas: Observable<Disciplina[]>;

  aluno: Observable<string>;

  constructor(private alunoService: AlunoService) {}

  ngOnInit() {
    this.aluno = this.alunoService.alunoInfo().map(aluno => aluno.nome);
    this.disciplinasFeitas = this.alunoService.alunoInfo().map(aluno => aluno.disciplinasFeitas);
  }

}
