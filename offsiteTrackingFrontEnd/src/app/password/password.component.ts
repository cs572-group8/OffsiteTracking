import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../service/user.service';
import { ClientService } from '../service/client-service.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';
import { State } from '../redux/reducers';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  passwordForm:FormGroup; 
  passwordMatch:boolean;
  submitted = false;
  errorMessage:string;

  user$: Observable<IUser>;
  user = {name: "", email: ""}
  constructor(
    private formBuilder:FormBuilder, 
    public userService: UserService,
    private service: ClientService,
    private router: Router,
    private store: Store<State>) 
    {
    this.passwordForm = this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      newPass:['',Validators.required],
      newPassConfirm:['',Validators.required]
    });
   }
  
  ngOnInit() {
    this.user$ = this.store.pipe(select('user'));
    this.user$.subscribe(result => {
      this.user.email = result.email;
      this.user.name = result.name;
    }); 
    this.passwordForm.get('firstName').setValue(this.user.name);
    this.passwordForm.get('email').setValue(this.user.email);
  }
  confirmPassword(){
      if (this.passwordForm.get('newPass').value != this.passwordForm.get('newPassConfirm').value){
          console.log('password not match!' + this.passwordForm.get('newPass').value +' '+this.passwordForm.get('newPassConfirm').value);
          this.passwordMatch = false;
      } else this.passwordMatch = true;
  }

  onSubmit() {
      this.submitted = true;
      if (this.passwordForm.invalid == true) {
        return;
      } else {
        this.service.updateEmployee(this.passwordForm.value)
          .subscribe(
            (data: any) => {
              //this.service.updateEmployee(data);
              console.log('Employee password updated successfully');
              return this.router.navigate(['user']);
            },
            error => { this.errorMessage = error.error.message }
          );
      }
  }
}
