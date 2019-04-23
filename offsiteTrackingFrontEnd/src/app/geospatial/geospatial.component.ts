import { GeoService } from './../service/geo.service';

import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from '../redux/reducers';
import { Observable } from 'rxjs';
import { ISchedule } from '../models/schedule.model'
import { DataService } from '../service/data.service';
import { discardPeriodicTasks } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'geospatial',
  templateUrl: './geospatial.component.html',
  styleUrls: ['./geospatial.component.scss']
})
export class GeospatialComponent implements OnInit {
  schedule$: Observable<ISchedule>;
  lat: any;
  lng: any;

  id;
  latdistination;
  langdistination
  place;
  checkindate;
  scheduleid;

  aftercheck:boolean;
  errorValidation:boolean;

  Information:any={}
  

  public origin: any;
  public destination: any;
  constructor(private router: Router, 
              private userService: UserService, 
              private store: Store<State>,
              private geoService:GeoService,
              private dataService:DataService,
              private snackBar: MatSnackBar) {
    this.schedule$ = this.store.pipe(select('schedule'));
    this.getUserLocation();
  }

  ngOnInit() {
     this.schedule$.subscribe(x => this.latdistination = x.location[0])
    this.schedule$.subscribe(x => this.langdistination = x.location[1])
    this.schedule$.subscribe(x => this.id=x.empId)
    this.schedule$.subscribe(x => this.checkindate=x.checkindate);
    this.schedule$.subscribe(x => this.place=x.placeName);
    this.schedule$.subscribe(x=>this.scheduleid=x.scheduleId);
  }

  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        this.getDirection();
      });
    }
  }
  getDirection() {
    this.origin =     { lat: parseFloat(this.lat), lng: parseFloat(this.lng) };
    this.destination = { lat: parseFloat(this.latdistination), lng: parseFloat(this.langdistination) }
  }

  CheckIn() {
   
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;

      //const distance = this.userService.getDistanceFromLatLonInKm(this.lat, this.lng, this.latdistination, this.langdistination);
         const x=this.geoService.getDistanceInformation(this.lat,this.lng,this.latdistination,this.langdistination)
       this.dataService.emitter.subscribe(res=>{   
             this.Information.distination=res.destination_address,
             this.Information.origin=res.origin,
             this.Information.distance=res.distance,
              this.Information.duration=res.duration
               this.errorValidation=true;
              
       if (parseFloat(this.Information.distance)*1000<1000) {
         
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const checkin = {
          id: this.id,
          placeName: this.place,
          checkInDate: today,
          checkInTime: time,
          scheduleid:this.scheduleid,
          status: this.getStatus(this.checkindate, today)
        }
        console.log("geospatial",checkin);
        this.userService.saveCheckIn(checkin).subscribe((user) =>
           { 
            this.snackBar.open("Confirm", 'Close', { duration: 3000 }); 
            this.aftercheck=true;
             
            }
        )
      } else {
        this.Information.warning = "Please go to Right place to check in";
      
      }
    })
   });
  }
  getStatus(timeToCheckn, checkInTIme) {
    if (timeToCheckn < checkInTIme) {
      timeToCheckn.setDate(timeToCheckn.getDate() + 1);
    }
    var diff = timeToCheckn - checkInTIme
    diff = Math.floor(diff / 1000 / 60);
    console.log(diff + "," + timeToCheckn + "," + checkInTIme)
    if (diff > 30 && diff < 60) {
      return "late";
    } else if (diff > 60) {
      return "Cancelled"
    } else {
      return "ontime"
    }
  }
  sendToMySchedule(){
    this.router.navigate(['mySchedule']);
  }
}