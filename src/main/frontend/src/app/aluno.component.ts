import { Component, OnInit } from '@angular/core';
import { AlunoService } from './aluno.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-alunos',
  templateUrl: './aluno.component.html'
})
export class AlunoComponent implements OnInit {

  constructor(private alunoService: AlunoService) {}

  ngOnInit(): void {
  }
}
