import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private router: Router, private flash: FlashMessagesService) { };

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const headers = { 'Access-Control-Allow-Credentials': 'true' };

        const authHeader = AuthenticationService.getAuthorizationHeader();
        if (authHeader) {
            headers['Authorization'] = authHeader;
        }
        const authReq = req.clone({ setHeaders: headers });

        // redirect if login error
        return next.handle(authReq).do(event => { }, err => {
            if (err instanceof HttpErrorResponse && (err.status == 401 || err.status == 403)) {
                this.flash.show('Você não tem permissão de acessar essa área', { cssClass: 'alert-danger', timeout: 3000 });                
                this.router.navigate(['/login']);
            }
        });
    }
}
