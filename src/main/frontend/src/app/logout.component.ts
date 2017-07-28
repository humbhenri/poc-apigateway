import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "./authentication.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  template: ''
})

export class LogoutComponent implements OnInit {

  constructor(private _authService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this._authService.logout();
    this.router.navigate(['login']);
  }

}
