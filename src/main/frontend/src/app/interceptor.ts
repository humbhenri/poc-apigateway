import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private router: Router, private flash: FlashMessagesService,
        private slimLoader: SlimLoadingBarService) { };

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.showLoader();

        const headers = { 'Access-Control-Allow-Credentials': 'true' };

        const authHeader = AuthenticationService.getAuthorizationHeader();
        if (authHeader) {
            headers['Authorization'] = authHeader;
        }
        const authReq = req.clone({ setHeaders: headers });

        // redirect if login error
        return next.handle(authReq).do(event => {
            if (event instanceof HttpResponse) {
                this.hideLoader();
            }
        },
            err => {
                if (err instanceof HttpErrorResponse && (err.status == 401 || err.status == 403)) {
                    this.flash.show('Você não tem permissão de acessar essa área', { cssClass: 'alert-danger', timeout: 3000 });
                    this.router.navigate(['/login']);
                }
                this.hideLoader();
            });
    }

    showLoader() {
        this.slimLoader.start();
    }

    hideLoader() {
        this.slimLoader.complete();
    }
}
