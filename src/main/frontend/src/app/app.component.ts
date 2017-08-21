import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { User } from './user';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loggedIn = false;

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.auth.loggedIn.subscribe(logged => this.loggedIn = logged);
  }

  onClick(event: Event): void {
    event.preventDefault(); // Prevents browser following the link
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
