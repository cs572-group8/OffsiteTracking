import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from '../redux/reducers'
import * as UserActions from '../redux/actions/user.action'

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    user: any = {}
    constructor(public router: Router, private store: Store<State>) {
        this.store.pipe(select('user')).subscribe((result: any) => {
            this.user = result
        })
    }
    canActivate(): boolean {
        console.log("login guard")
        const token = localStorage.getItem('current_user');
        if (token !== null) {
            if (this.user != null) {
                if (this.user.type == "admin")
                    this.router.navigate(['']);
                else
                    this.router.navigate(['mySchedule']);
            } else {
                this.router.navigate(['login']);
            }
            return false;
        }
        return true;
    }
}