import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from '../redux/reducers';
import { IUser } from '../models/user.model'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TypeGuard implements CanActivate {
    user$: Observable<IUser>;
    user;
    constructor(public router: Router,
        private store: Store<State>) {
        this.user$ = this.store.pipe(select('user'));
        this.user$.subscribe((user) => {
            this.user = user;
        });
    }

    canActivate(): boolean {
        const token = window.localStorage.getItem('current_token');
        if (token === null) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}