import { Component, OnInit } from '@angular/core';
import { ProfessorCadastroService } from '../professor-cadastro.service';
import { Observable } from "rxjs/Observable";
import { Professor } from "../professor";

@Component({
  selector: 'app-cadastro-professor',
  templateUrl: './cadastro-professor.component.html',
  styleUrls: ['./cadastro-professor.component.css']
})
export class CadastroProfessorComponent implements OnInit {

  professores: Observable<Professor[]>

  constructor(private service: ProfessorCadastroService) { }

  ngOnInit() {
    this.professores = this.service.getProfessores();
  }

}
