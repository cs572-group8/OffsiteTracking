import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../service/client-service.service';
import { Store, select } from '@ngrx/store';
import { State } from '../redux/reducers'
import * as UserActions from '../redux/actions/user.action'
import * as LoaderActions from '../redux/actions/loader.action'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  serviceErrors: any = {};
  submitted = false;
  data;
  user;
  requestCounter: number = 1;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private clientService: ClientService,
    private store: Store<State>,
    private router: Router
  ) {
    this.store.pipe(select('loader')).subscribe((result: any) => {
      setTimeout(() => this.requestCounter = result.counter, 0)
    })
  }
  invalidPassword() {
    return (this.submitted && this.loginForm.controls.password.errors != null);
  }
  invalidEmail() {
    return (this.submitted && this.loginForm.controls.email.errors != null);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [{ value: '', disabled: this.requestCounter > 1 }, [Validators.required, Validators.email]],
      password: [{ value: '', disabled: this.requestCounter > 1 }, [Validators.required]]
    });

  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid == true) {
      return;
    } else {
      this.clientService.login(this.loginForm.value)
        .subscribe(
          (result: any) => {
            this.userService.saveUser(result.token);
            const { name, userType, email } = result;
            this.store.dispatch(new UserActions.Login({
              name,
              userType,
              email
            }))
            if (userType == 'admin')
              return this.router.navigate(['']);
            else
              return this.router.navigate(['mySchedule']);
          },
          error => {
            this.serviceErrors = error.error
            this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
          },
          () => {
            console.log(this.requestCounter);
            this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
          }
        );
    }
  }
}
