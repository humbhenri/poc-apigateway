import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { AuthenticationService } from './authentication.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let headers = {'Access-Control-Allow-Credentials': 'true'};

        const authHeader = AuthenticationService.getAuthorizationHeader();
        if (authHeader) {
            headers['Authorization'] = authHeader;
        }
        const authReq = req.clone({setHeaders: headers});
        return next.handle(authReq);
    }
}
