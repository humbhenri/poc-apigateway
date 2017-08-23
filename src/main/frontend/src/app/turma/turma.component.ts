import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AvaliacaoService } from "../avaliacao.service";
import { Turma } from "../turma";

@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.css']
})
export class TurmaComponent implements OnInit {

  notas: Object[];

  nome: string;

  constructor(private service: AvaliacaoService, 
    private flash: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => {
      if (params.has('id')) {
        const id: number = +params.get('id');
        return this.service.getNotasByTurma(id);
      } else {
        return Observable.of(null);
      }
    })
    .catch(err => {
      return this.handleErr(err);
    })
    .subscribe(data => this.notas = data);

    this.service.nomeTurmaAtual.subscribe(nome => this.nome = nome);
  }

  handleErr(err) {
    console.log(err);
    this.flash.show('Ocorreu um erro, tente novamente mais tarde', {cssClass: 'alert-danger'});
    return Observable.of(null);
  }

}
