import { Component, OnInit } from '@angular/core';
import { Professor, Username } from '../professor';
import { ProfessorCadastroService } from '../professor-cadastro.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professor-form',
  templateUrl: './professor-form.component.html',
  styleUrls: ['./professor-form.component.css']
})
export class ProfessorFormComponent implements OnInit {

  model = new Professor(null, null, new Username(null, 1, null), null, null, null);

  constructor(private service: ProfessorCadastroService, 
    private flash: FlashMessagesService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.service.salvarProfessor(this.model).subscribe(data => {
      this.flash.show('Dado salvo com sucesso.', {cssClass: 'alert-success', timeout: 5000});
      this.router.navigate(['coordenador/cadastro-professor']);
    }, err => {
      console.log(err);
      this.flash.show('Houve um erro ao salvar o dado.', {cssClass: 'alert-danger', timeout: 5000});
    });
  }

}
