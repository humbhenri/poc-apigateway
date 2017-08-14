import { Component, OnInit } from '@angular/core';
import { Professor, Username } from '../professor';
import { ProfessorCadastroService } from '../professor-cadastro.service';
@Component({
  selector: 'app-professor-form',
  templateUrl: './professor-form.component.html',
  styleUrls: ['./professor-form.component.css']
})
export class ProfessorFormComponent implements OnInit {

  model = new Professor(null, null, new Username(null, 1, null), null, null, null); 

  constructor(private service: ProfessorCadastroService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.service.salvarProfessor(this.model).subscribe(data => console.log(data), err => console.log(err));
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
