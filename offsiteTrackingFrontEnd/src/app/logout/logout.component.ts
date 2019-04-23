import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../redux/reducers'
import { Router } from '@angular/router';
import * as UserActions from '../redux/actions/user.action'

@Component({
  selector: 'app-logout',
  template: '',
  styles: ['']
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router, private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new UserActions.Logout());
    localStorage.removeItem('current_user')
    this.router.navigate(['']);
  }
}
