import {Component, OnInit} from '@angular/core';
import {MenuService} from '../menu.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.emitChange([
      {
        'routerLink': 'professor/avaliacao',
        'label': 'Lançar notas'
      }
    ]);
  }

}
