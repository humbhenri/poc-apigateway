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

  loggedIn = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {
  }

  get username() {
    return localStorage.getItem('username');
  }

  login(username: string, password: string) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(Config.API_BASE + 'login', querystring.stringify({ username, password }), { headers })
      .map((response: Response) => {
        localStorage.setItem('auth', btoa(username + ':' + password));
        localStorage.setItem('username', username);
        this.loggedIn.emit(true);
        return 'OK';
      });
  }

  logout() {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    this.loggedIn.emit(false);
  }

  static getAuthorizationHeader() {
    if (localStorage.getItem('auth')) {
      return 'Basic ' + localStorage.getItem('auth');
    }
    return null;
  }
}
