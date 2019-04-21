import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ClientService } from '../service/client-service.service';


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
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private clientService: ClientService) {
  }
  invalidPassword() {
    return (this.submitted && this.loginForm.controls.password.errors != null);
  }
  invalidEmail() {
    return (this.submitted && this.loginForm.controls.email.errors != null);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      //password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
    });

  }
  onSubmit() {

    this.submitted = true;
    if (this.loginForm.invalid == true) {
      return;
    }
    else {

      this.clientService.login(this.loginForm.value)
        .subscribe(
          (data: any) => {
            this.userService.saveUser(data);
            console.log('login successful');
            return this.router.navigate(['user']);
          },
          error => { this.serviceErrors = error.error }

        );

    }
  }

}
