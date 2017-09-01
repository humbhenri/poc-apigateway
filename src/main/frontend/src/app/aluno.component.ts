import { Component, OnInit } from '@angular/core';
import { AlunoService } from './aluno.service';
import { Observable } from 'rxjs/Observable';
import {MenuService} from './menu.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './aluno.component.html'
})
export class AlunoComponent implements OnInit {

  constructor(private alunoService: AlunoService, 
  private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.emitChange([
      {
        'routerLink': 'aluno/aluno-info',
        'label': 'Aluno'
      },
      {
        'routerLink': 'aluno/matricula',
        'label': 'Matrícula'
      },
    ]);
  }
}
