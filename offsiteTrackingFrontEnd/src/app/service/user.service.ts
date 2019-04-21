import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private router:Router) { }


  saveUser(user) {
    localStorage.setItem('current_user', user);
  }

  getUser() {
    return localStorage.getItem('current_user');
  }

  deleteUser() {
    localStorage.removeItem('current_user');
  }

  getUserPreviledge() {
    const user = this.getPayLoad();
    if (user) {
      return user.type;
    }
    return null;
  }
  logOut() {
    console.log('logout succesful')
     this.deleteUser();
     this.router.navigateByUrl('');
  }
  getPayLoad(){
    const token=this.getUser();
    if(token){
      const userPayLoad=atob(token.split('.')[1]);
      return JSON.parse(userPayLoad);
    }
   }

    getMySchedule(id:string){
      return this.http.get('/api/schedule/'+id)
      }

}
