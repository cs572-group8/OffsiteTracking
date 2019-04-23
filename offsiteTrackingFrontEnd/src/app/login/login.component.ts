import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ClientService } from '../service/client-service.service';
import { Store } from '@ngrx/store';
import { State } from '../redux/reducers'
import * as UserActions from '../redux/actions/user.action'

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

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private clientService: ClientService,
    private store: Store<State>,
    private router: Router
  ) { }
  invalidPassword() {
    return (this.submitted && this.loginForm.controls.password.errors != null);
  }
  invalidEmail() {
    return (this.submitted && this.loginForm.controls.email.errors != null);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

  }
  onSubmit() {
<<<<<<< HEAD

<<<<<<< HEAD
    
    console.log("login");
=======

>>>>>>> 20a885856f94e13782632cb278a1d0e392a13e0e
=======
>>>>>>> 89c7e08046c0355ba80daeac5c565f0310eebc0c
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
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 20a885856f94e13782632cb278a1d0e392a13e0e
            return this.router.navigate(['user']);
=======
            if (userType == 'admin')
              return this.router.navigate(['Schedule']);
            else
              return this.router.navigate(['mySchedule']);
>>>>>>> 89c7e08046c0355ba80daeac5c565f0310eebc0c
          },
          error => { this.serviceErrors = error.error }
        );
    }
  }
}
