import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import * as querystring from 'querystring';
import { User } from './user';
import { Config } from './config'; 

@Injectable()
export class AuthenticationService {

  private loggedIn: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.loggedIn.next(!!localStorage.getItem('auth'));
  }

  get username() {
    return localStorage.getItem('username');
  }

  static getAuthorizationHeader() {
    if (localStorage.getItem('auth')) {
      return 'Basic ' + localStorage.getItem('auth');
    }
    return null;
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(username: string, password: string) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(username + ':' + password))
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Access-Control-Allow-Credentials', 'true');
    return this.http.post(Config.API_BASE + 'login', querystring.stringify({ username, password }), { headers })
      .map((response: Response) => {
        localStorage.setItem('auth', btoa(username + ':' + password));
        localStorage.setItem('username', username);
        this.loggedIn.next(!!localStorage.getItem('auth'));
        return 'OK';
      });
  }

  logout() {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    this.loggedIn.next(!!localStorage.getItem('auth'));

  }

}
