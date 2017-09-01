import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { User } from './user';
import { Router } from '@angular/router';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  private menus = [];

  get loggedIn() {
    return this.auth.isLogged();
  }

  constructor(private auth: AuthenticationService, private router: Router, private menuService: MenuService) {
    menuService.changeEmitted$.subscribe(menus => this.menus = menus);
  }

  ngOnInit() {
    
  }

  onClick(event: Event): void {
    event.preventDefault(); // Prevents browser following the link
    this.auth.logout();
    this.router.navigate(['/']);
    this.menus = [];
  }

}
