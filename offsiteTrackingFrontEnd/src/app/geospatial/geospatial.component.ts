import { GeoService } from './../service/geo.service';

import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from '../redux/reducers';
import { Observable } from 'rxjs';
import { ISchedule } from '../models/schedule.model'

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

  Confirmation: any = {
    id: "",
    placeName: "",
    checkInDate: "",
    checkInTime: "",
    status: "",
    location:[]
  }
  

  public origin: any;
  public destination: any;
  constructor(private route: ActivatedRoute, 
              private userService: UserService, 
              private store: Store<State>,
              private geoService:GeoService) {
    this.schedule$ = this.store.pipe(select('schedule'));
    this.getUserLocation();
  }

  ngOnInit() {
    // this.schedule$.subscribe(x=>{
    //   this.langdistination=x.location[0],
    //   this.latdistination=x.location[1],
    //   this.id=x.empId,
    //   this.checkindate=x.checkindate
    //   this.place=x.placeName
    //   })
    this.schedule$.subscribe(x => this.latdistination = x.location[0])
    this.schedule$.subscribe(x => this.langdistination = x.location[1])
    this.schedule$.subscribe(x => this.id=x.empId)
    this.schedule$.subscribe(x => this.checkindate=x.checkindate);
    this.schedule$.subscribe(x => this.place=x.checkindate);
    
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

      const distance = this.userService.getDistanceFromLatLonInKm(this.lat, this.lng, this.latdistination, this.langdistination);
         this.geoService.getDistanceInformation(this.lat,this.lng,this.latdistination,this.langdistination);
      // console.log("distance",distance)
      // if (distance < 10) {
      //   const today = new Date();
      //   const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      //   const checkin = {
      //     id: this.id,
      //     placeName: this.place,
      //     checkInDate: today,
      //     checkInTime: time,
      //     status: this.getStatus(this.checkindate, today)
      //   }
      //   this.userService.saveCheckIn(checkin).subscribe((user) =>
      //       this.Confirmation=user
      //   )
      // } else {
      //   this.Confirmation.status = "Please go to Right place to check in"
      // }

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
      return "The Assignment is Cancelled"
    } else {
      return "ontime"
    }
  }
}