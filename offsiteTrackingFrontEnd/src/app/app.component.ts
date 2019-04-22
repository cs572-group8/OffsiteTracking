import { UserService } from './service/user.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from './redux/reducers';
import { Observable } from 'rxjs';
import { IUser } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  user$: Observable<IUser>;

  constructor(private router: Router, private userService: UserService, private store: Store<State>) {
    this.user$ = this.store.pipe(select('user'));
    console.log(this.user$)
  }
  title = 'offsiteTrackingFrontEnd';

  ngOnInit() {
  }

  showMyLogout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('');
  }

  onLogout() {
    this.userService.logOut();
  }
}
