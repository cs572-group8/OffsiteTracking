import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-schedule',
  templateUrl: './my-schedule.component.html',
  styleUrls: ['./my-schedule.component.scss']
})
export class MyScheduleComponent implements OnInit {
   mySchedule:any=[];
  constructor(private userService:UserService) {
        
   }
  ngOnInit(){
    this.userService.getMySchedule(this.userService.getPayLoad()._id).subscribe((data)=>this.mySchedule=data);

}
}