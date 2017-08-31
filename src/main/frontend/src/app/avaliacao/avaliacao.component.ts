import { Component, OnInit } from '@angular/core';
import { AvaliacaoService } from '../avaliacao.service';
import { AuthenticationService } from '../authentication.service';
import { Turma } from '../turma';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {

  turmas: Observable<Turma[]>;

  constructor(private service: AvaliacaoService, 
    private auth: AuthenticationService,
    private router: Router,
    private flash: FlashMessagesService
  ) { }

  ngOnInit() {
    this.turmas = this.service.getTurma(this.auth.username).catch(err => {
      this.flash.show('Não foi possível buscar as suas turmas.', {cssClass: 'alert-danger', timeout: 3000});
      console.log(err);
      return Observable.of(null);
    });
  }

  lancaNotas(turma: Turma, event) {
    event.preventDefault();
    this.service.mudaNomeTurma(turma.disciplina.nome);
    this.router.navigate(['professor/turma', turma.id]);    
  }

}
