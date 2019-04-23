import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(public router: Router) { }
    canActivate(): boolean {
        const token = localStorage.getItem('current_user');
        console.log(token)
        if (token === null) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}