import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AvaliacaoService } from "../avaliacao.service";
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent implements OnInit {

  model: Object = {};

  turma: string;

  constructor(private service: AvaliacaoService, 
    private flash: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => {
      if (params.has('id')) {
        const id: number = +params.get('id');
        return this.service.getNotaById(id);
      } else {
        return Observable.of(null);
      }
    })
    .catch(err => {
      return this.handleErr(err);
    })
    .subscribe(data => this.model = data);

    this.service.nomeTurmaAtual.subscribe(data => this.turma = data);
  }

  handleErr(err) {
    console.log(err);
    this.flash.show('Ocorreu um erro, tente novamente mais tarde', {cssClass: 'alert-danger'});
    return Observable.of(null);
  }

  onSubmit() {
    this.service.salvaNota(this.model).subscribe(_ => {
      this.flash.show('Nota salva com sucesso', {cssClass:'alert-success'});
      this.location.back();
    }, err => this.handleErr(err));
  }

}
