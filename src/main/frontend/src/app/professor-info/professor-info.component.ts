import { Component, OnInit } from '@angular/core';
import { ProfessorInfoService } from '../professor-info.service';
import { Professor } from "../professor";
import { Observable } from "rxjs/Observable";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-professor-info',
  templateUrl: './professor-info.component.html',
  styleUrls: ['./professor-info.component.css']
})
export class ProfessorInfoComponent implements OnInit {

  professor: Professor;

  constructor(private service: ProfessorInfoService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.switchMap(params => {
      const id = +params['id'];
      return this.service.getProfessorById(id);      
    }).subscribe((professor: Professor) => this.professor = professor);
  }

}
