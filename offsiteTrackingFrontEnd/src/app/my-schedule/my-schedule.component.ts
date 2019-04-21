import { UserService } from './../service/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CombineLatestOperator } from 'rxjs/internal/observable/combineLatest';
@Component({
  selector: 'app-my-schedule',
  templateUrl: './my-schedule.component.html',
  styleUrls: ['./my-schedule.component.scss'],
})
export class MyScheduleComponent implements OnInit {
    lat:number;
    lng:number;
    Confirmation:any={
      id:"",
      placeName: "",
      checkInDate:"",
      checkInTime: "",
      status: ""
    }
   mySchedule: any = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getMySchedule(this.userService.getPayLoad()._id)
      .subscribe(
        (data) => this.mySchedule = data);
  }

    CheckIn(event,mylocation,id,place,date){
       navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        const distance=this.userService.getDistanceFromLatLonInKm(this.lat,this.lng,mylocation[0],mylocation[1]);
                    if(distance<100){
            const today = new Date();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                     const checkin= {
                        id:id,
                        placeName: place,
                        checkInDate:today,
                        checkInTime: time,
                        status: this.getStatus(date,today)
                      }
                this.userService.saveCheckIn(checkin).subscribe((user)=>
                  this.Confirmation=user
                  
                )
                     }
                    
                    else{
                      this.Confirmation="Please go to Right place to check in"
                    }

      });
  }
       getStatus(timeToCheckn,checkInTIme)
       {
        if (timeToCheckn < checkInTIme) {
          timeToCheckn.setDate(timeToCheckn.getDate() + 1);
         }
         var diff=timeToCheckn-checkInTIme
         diff= Math.floor(diff/ 1000 / 60);
          console.log(diff+","+timeToCheckn+","+checkInTIme)
           if(diff>30 && diff < 60){
             return "late";
           }else if(diff>60){
             return "The Assignment is Cancelled"
           }else{
             return "ontime"
           }
       }
  
}