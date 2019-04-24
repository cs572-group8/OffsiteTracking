import { GeoService } from './../service/geo.service';

import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from '../redux/reducers';
import { Observable } from 'rxjs';
import { ISchedule } from '../models/schedule.model'
import { DataService } from '../service/data.service';
import { MatSnackBar } from '@angular/material';
import * as LoaderActions from '../redux/actions/loader.action'

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

  aftercheck: boolean;
  errorValidation: boolean;

  Information: any = {}

  public origin: any;
  public destination: any;

  requestCounter: number = 0;
  constructor(private router: Router,
    private userService: UserService,
    private store: Store<State>,
    private geoService: GeoService,
    private dataService: DataService,
    private snackBar: MatSnackBar) {
    this.store.pipe(select('loader')).subscribe((result: any) => {
      this.requestCounter = result.counter
    })
    this.schedule$ = this.store.pipe(select('schedule'));
    this.getUserLocation();
  }

  ngOnInit() {
    this.schedule$.subscribe(x => {
      this.latdistination = x.location[0]
      this.langdistination = x.location[1]
      this.id = x.empId
      this.checkindate = x.checkindate
      this.place = x.placeName
      this.scheduleid = x.scheduleId
    })
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
    this.origin = { lat: parseFloat(this.lat), lng: parseFloat(this.lng) };
    this.destination = { lat: parseFloat(this.latdistination), lng: parseFloat(this.langdistination) }
  }

  CheckIn() {
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;

      const x = this.geoService.getDistanceInformation(this.lat, this.lng, this.latdistination, this.langdistination)
      this.dataService.emitter.subscribe(
        res => {
          this.Information.distination = res.destination_address,
            this.Information.origin = res.origin,
            this.Information.distance = res.distance,
            this.Information.duration = res.duration
          this.errorValidation = true;
          if (parseFloat(this.Information.distance) * 1000 < 1000) {
            const today = new Date();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const checkin = {
              id: this.id,
              placeName: this.place,
              checkInDate: today,
              checkInTime: time,
              scheduleid: this.scheduleid,
              status: this.getStatus(this.checkindate, today)
            }

            this.userService.saveCheckIn(checkin).subscribe(
              (user) => {
                this.snackBar.open("Confirm", 'Close', { duration: 3000 });
                this.aftercheck = true;
                this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
              }, err => {
                this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
              }
            )
          } else {
            this.Information.warning = "Please go to Right place to check in";
          }
        },
        err => {
          this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
        },
        () => {
          this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
        })
    });
  }
  getStatus(timeToCheckn, checkInTIme) {
    if (timeToCheckn < checkInTIme)
      timeToCheckn.setDate(timeToCheckn.getDate() + 1);

    var diff = timeToCheckn - checkInTIme
    diff = Math.floor(diff / 1000 / 60);
    if (diff > 30 && diff < 60) {
      return "late";
    } else if (diff > 60) {
      return "Cancelled"
    } else {
      return "ontime"
    }
  }
  sendToMySchedule() {
    this.router.navigate(['mySchedule']);
  }
}