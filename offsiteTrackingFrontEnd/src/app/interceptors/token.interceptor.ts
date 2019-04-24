import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Store, select } from '@ngrx/store';
import { State } from '../redux/reducers'
import * as LoaderActions from '../redux/actions/loader.action'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    count: number = 0;
    constructor(private store: Store<State>) {
        this.store.pipe(select('loader')).subscribe((result: any) => {
            this.count = result.counter
        })
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = null
        this.store.dispatch(new LoaderActions.Change({ counter: this.count + 1 }))
        if (req.url.indexOf("googleapis") == -1 && localStorage.getItem('current_user'))
            authReq = req.clone({
                headers: req.headers.set('Authorization', localStorage.getItem('current_user'))
            })
        else
            authReq = req.clone({})
        return next.handle(authReq);
    }
}
