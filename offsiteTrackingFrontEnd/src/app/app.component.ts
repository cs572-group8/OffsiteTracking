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
    this.user= this.userService.getPayLoad().type==='admin'?true:false;
    return this.user;
    console.log("where",this.user);
  }
 
  showSchedule(){
    this.router.navigateByUrl('Schedule');
  }
  showEmployee(){
    this.router.navigateByUrl('user');
  }
}
