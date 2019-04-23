import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = null
        if (req.url.indexOf("googleapis") == -1 && localStorage.getItem('current_user'))
            authReq = req.clone({
                headers: req.headers.set('Authorization', localStorage.getItem('current_user'))
            })
        else
            authReq = req.clone({})

        return next.handle(authReq);
    }
}
