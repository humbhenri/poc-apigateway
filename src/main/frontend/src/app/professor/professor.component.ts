import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() { }

  onClick(event: Event): void {
    event.preventDefault(); // Prevents browser following the link
    this.auth.logout();
    this.router.navigate(['/']);
  }


}
