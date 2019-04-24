import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../redux/reducers'
import { Router } from '@angular/router';
import * as UserActions from '../redux/actions/user.action'
import * as LoaderActions from '../redux/actions/loader.action'

@Component({
  selector: 'app-logout',
  template: '',
  styles: ['']
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router, private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new UserActions.Logout());
    this.store.dispatch(new LoaderActions.Change({ counter: 0 }))
    localStorage.removeItem('current_user')
    this.router.navigate(['']);
  }
}
