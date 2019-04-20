import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getToken(){
    return localStorage.getItem('jwt');
  }
  getPayLoad(){
    const token=this.getToken();
    if(token){
      const userPayLoad=atob(token.split('.')[1]);
      return JSON.parse(userPayLoad);
    }
  }

}
