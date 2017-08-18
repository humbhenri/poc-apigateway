import {Component, OnInit} from '@angular/core';
import {AlunoService} from '../aluno.service';
import {Aluno} from '../aluno';
import {Disciplina} from '../disciplina';
import {Observable} from 'rxjs/Observable';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-aluno-info',
  templateUrl: './aluno-info.component.html',
  styleUrls: ['./aluno-info.component.css']
})
export class AlunoInfoComponent implements OnInit {

  disciplinasFeitas: Observable<Disciplina[]>;

  aluno: Observable<string>;

  constructor(private alunoService: AlunoService, private flash: FlashMessagesService) {}

  ngOnInit() {
    this.aluno = this.alunoService.alunoInfo().catch((erro) => {
      console.log(erro);
      this.flash.show('Não foi possível buscar as informações do aluno', {cssClass: 'alert-danger', timeout: 5000});
      return Observable.of(new Aluno(null, null, null, null));
    }).map(aluno => aluno.nome);

    this.disciplinasFeitas = this.alunoService.alunoInfo()
    .catch(erro => {
      console.log(erro);
      this.flash.show('Não foi possível buscar as disciplinas do aluno', {cssClass: 'alert-danger', timeout: 5000});
      return Observable.of(new Aluno(null, null, null, null));
    })
    .map(aluno => aluno.disciplinasFeitas);
  }

}
