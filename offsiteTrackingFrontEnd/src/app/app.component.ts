import { UserService } from './service/user.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user:boolean
  constructor(private router:Router,private userService:UserService){}
  title = 'offsiteTrackingFrontEnd';

  ngOnInit(){
      }
 
  showSchedule(){
    this.router.navigateByUrl('Schedule');
  }
  showEmployee(){
    this.router.navigateByUrl('user');
  }
  showMyLogout(){
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('');
  }
  showMySchedule(){
    this.router.navigateByUrl('mySchedule');
   //this.userService.getMySchedule();
  }
  onLogout() {
    this.userService.logOut();
  }


}
