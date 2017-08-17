import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  returnUrl: string;
  loading = false;

  constructor(private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private flash: FlashMessagesService) { }

  ngOnInit(): void {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
      data => {
        console.log(data);
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.loading = false;
        console.log(error);
        if (error.status === 401) {
          this.flash.show('Usuário ou senha incorretos!', {cssClass : 'alert-danger', timout: 5000});
        } else {
          this.flash.show('Ocorreu um erro, tente novamente mais tarde.', {cssClass : 'alert-danger', timout: 5000});
        }
      });
  }
}
