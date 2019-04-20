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
  serviceErrors:any = {};
  submitted = false;
  data;
  constructor(private formBuilder: FormBuilder, private http: HttpClient,private router:Router)  {  }
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
  	 password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
  	});
  }
  onSubmit(){
    this.submitted = true;
  	if(this.loginForm.invalid == true){
  		return;
  	}
  	else
  	{
      // this.data=this.loginForm.value;
      // this.http.post('/api/v1/users/signin', this.data)
      // .subscribe(
      //   (data:any) => {        
      //    localStorage.removeItem('jwt');
      //     localStorage.setItem('jwt',data);
      //    }, 
      //           error =>   { 	this.serviceErrors = error.error.error;
      //   });
      //   return this.router.navigate([''])
  	      
  	}
  }

}
