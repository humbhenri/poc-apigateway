import { Component, OnInit } from '@angular/core';
import { Professor, Username } from '../professor';
import { ProfessorCadastroService } from '../professor-cadastro.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/Operator';
import { Observable } from 'rxjs/Observable';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-professor-form',
  templateUrl: './professor-form.component.html',
  styleUrls: ['./professor-form.component.css']
})
export class ProfessorFormComponent implements OnInit {

  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
  };

  date: any;

  model = new Professor(null, null, new Username(null, 1, null), null, null, null);

  constructor(private service: ProfessorCadastroService,
    private flash: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => {
      if (params.has('id')) {
        const id: number = +params.get('id');
        return this.service.getProfessor(id);
      } else {
        return Observable.of(new Professor(null, null, new Username(null, 1, null), null, null, null));
      }
    })
    .first()
    .subscribe((professor) => {
      this.model = professor;
      if (!!professor.nascimento) {
        const nascimento = new Date(professor.nascimento);
        this.date = {date: {
                      year: nascimento.getFullYear(),
                      month: nascimento.getMonth() + 1,
                      day: nascimento.getDate(),
        }};
      }
    });
  }

  onSubmit() {
    if (!!this.date) {
      this.model.nascimento = this.date.jsdate;
      this.model.nascimento = new Date(this.model.nascimento.getTime() + Math.abs(this.model.nascimento.getTimezoneOffset() * 60000));
    }
    if (this.model.id) {
      this.atualizarProfessor();
    } else {
      this.criarProfessor();
    }
  }

  criarProfessor() {
    this.service.salvarProfessor(this.model).subscribe(data => {
      this.flash.show('Dado salvo com sucesso.', {cssClass: 'alert-success', timeout: 5000});
      this.router.navigate(['coordenador/cadastro-professor']);
    }, err => {
      console.log(err);
      this.flash.show('Houve um erro ao salvar o dado.', {cssClass: 'alert-danger', timeout: 5000});
    });
  }

  atualizarProfessor() {
    this.service.atualizarProfessor(this.model).subscribe(data => {
      this.flash.show('Dado salvo com sucesso.', {cssClass: 'alert-success', timeout: 5000});
      this.router.navigate(['coordenador/cadastro-professor']);
    }, err => {
      console.log(err);
      this.flash.show('Houve um erro ao salvar o dado.', {cssClass: 'alert-danger', timeout: 5000});
    });
  }

  cancelar() {
    this.router.navigate(['coordenador/cadastro-professor']);
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }

}
