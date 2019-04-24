import { Store, select } from '@ngrx/store';
import { UserService } from './../service/user.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { State } from '../redux/reducers'
import * as ScheduleAction from '../redux/actions/schedule.action'
import * as LoaderActions from '../redux/actions/loader.action'
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-schedule',
  templateUrl: './my-schedule.component.html',
  styleUrls: ['./my-schedule.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MyScheduleComponent implements OnInit {
  lat: any;
  lng: any;

  mySchedule: any = [];
  notavilable: boolean = false;
  constructor(private userService: UserService, private router: Router, private store: Store<State>) {
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.userService.getMySchedule(this.userService.getPayLoad()._id, this.lat, this.lng)
        .subscribe(
          (data) => this.mySchedule = data,
          (err) => console.log(err),
          () => {
            if (this.mySchedule.length === 0) {
              this.notavilable = true;
            }
          }

        )
    })
    // this.store.dispatch(new ScheduleAction.DeleteSchedule());
  }

  Destination(empId, location, placeName, checkindate, scheduleId) {
    this.store.dispatch(new ScheduleAction.CreateSchedule(
      { location, empId, placeName, checkindate, scheduleId }))
    this.router.navigate(['mySchedule/geospatial']);
  }



}
