import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
@Component({
  selector: 'app-my-schedule',
  templateUrl: './my-schedule.component.html',
  styleUrls: ['./my-schedule.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MyScheduleComponent implements OnInit {
  
   mySchedule:any=[];
  constructor(private userService:UserService) {
        
   }
  ngOnInit(){
    this.userService.getMySchedule(this.userService.getPayLoad()._id)
       .subscribe(
         (data)=>this.mySchedule=data);
}




}