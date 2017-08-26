import { Component, OnInit } from '@angular/core';
import { ProfessorCadastroService } from '../professor-cadastro.service';
import { Observable } from "rxjs/Observable";
import { Professor } from "../professor";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-professor',
  templateUrl: './cadastro-professor.component.html',
  styleUrls: ['./cadastro-professor.component.css']
})
export class CadastroProfessorComponent implements OnInit {

  professores: Professor[];

  constructor(private service: ProfessorCadastroService, 
    private flash: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
    this.service.getProfessores()
      .catch(err => {
        this.flash.show('Não foi possível obter os dados dos professores.', {cssClass: 'alert-danger'});
        console.log(err);
        return Observable.of(null);
      })
      .subscribe(data => this.professores = data);
  }

  delete(professor: Professor) {
    if (confirm('Você tem certeza que deseja remover o professor ' + professor.nome)) {
      this.service.deletarProfessor(professor).subscribe(
        data => {
          window.scrollTo(0, 0);          
          this.flash.show('Professor removido com sucesso.', {cssClass:'alert-success'});
          this.service.getProfessores().subscribe(data => this.professores = data);
        },
        err => {
          console.log(err);
          window.scrollTo(0, 0);          
          this.flash.show('Houve um erro ao remover o professor, provavelmente há turmas alocadas para ele.',
           {cssClass:'alert-danger', timeout:5000});
        }
      );
    }
  }
}
