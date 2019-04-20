import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  serviceErrors:any={};
  submitted = false;
  data;
  user;
  constructor(private formBuilder: FormBuilder, private http: HttpClient,private router:Router,private userService:UserService)  {  }
  invalidPassword()
  {
  	return (this.submitted && this.loginForm.controls.password.errors != null);
  }
  invalidEmail()
  {
  	return (this.submitted && this.loginForm.controls.email.errors != null);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
  	 //password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
    });
      this.user= this.userService.getPayLoad().type==='admin'?true:false;
      return this.user;
      console.log("where",this.user);
     
  }
  onSubmit(){

    this.submitted = true;
  	if(this.loginForm.invalid == true){
  		return;
  	}
  	else
  	{
      this.data=this.loginForm.value;
      console.log(this.data);
      this.http.post('/auth/login', this.data)
      .subscribe(
        (data:any) => {   
          console.log(data);     
         localStorage.removeItem('jwt');
          localStorage.setItem('jwt',data);
          return this.router.navigate(['user']);
         }, 
                error =>  { this.serviceErrors=error.error }
             
        );
     	      
  	}
  }

}
