import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  passwordForm:FormGroup;
  currentUser;
  passwordMatch:boolean;
  constructor(private formBuilder:FormBuilder, public userService: UserService) {
    this.passwordForm = this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      currPass:['',Validators.required],
      newPass:['',Validators.required],
      newPassConfirm:['',Validators.required]
    });
    //this.currentUser = this.userService.getUser();
    //console.log(this.currentUser);
    this.currentUser = {firstName:'Ari',lastName:'Dav'};
    this.passwordForm.value.firstName = this.currentUser.firstName;
    this.passwordForm.value.lastName = this.currentUser.lastName;
   }
  
  ngOnInit() {
   
  }
  confirmPassword(){
      if (!(this.passwordForm.get('newPass').value === this.passwordForm.get('newPassConfirm').value)){
          console.log('password not match!' + this.passwordForm.get('newPass').value +' '+this.passwordForm.get('newPassConfirm').value);
          this.passwordMatch = false;
      } else this.passwordMatch = true;
  }

    passValidator(newPass:FormControl,newPassConfirm:FormControl){
        const promise = new Promise<any>((resolve,reject) => {
            setTimeout(() => {
                if(newPass.value != newPassConfirm.value){
                    resolve({'invalid':true});
                } else resolve(null);
            },1500);
        })
        return promise;
    }
    
}
