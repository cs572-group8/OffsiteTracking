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
       return this.http.get('/api/admin/schedule/'+id)
      }

    saveCheckIn(checkin){
      console.log(checkin);
       return this.http.post('/api/employee/checkin',checkin);
    }

    getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
      }
      
      deg2rad(deg) {
        return deg * (Math.PI/180)
      }
      
}
