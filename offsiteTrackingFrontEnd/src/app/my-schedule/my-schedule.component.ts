
import { reducers } from './../redux/reducers/index';
import { Store } from '@ngrx/store';
import { UserService } from './../service/user.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CombineLatestOperator } from 'rxjs/internal/observable/combineLatest';
import { MAT_CHECKBOX_CLICK_ACTION, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { State } from '../redux/reducers'
import * as ScheduleAction from '../redux/actions/schedule.action'
import { ScheduleComponent } from '../schedule/schedule.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-schedule',
  templateUrl: './my-schedule.component.html',
  styleUrls: ['./my-schedule.component.scss'],
})
export class MyScheduleComponent implements OnInit {
  lat: any;
  lng: any;

  mySchedule: any = [];


  constructor(private userService: UserService, private router: Router, private store: Store<State>) {

  }

  ngOnInit() {
   
    this.userService.getMySchedule(this.userService.getPayLoad()._id)
                       .subscribe(
                        (data) => this.mySchedule = data);
     // this.store.dispatch(new ScheduleAction.DeleteSchedule());
  }
  
  CheckIn(empId, location, placeName, checkindate) {
        console.log(location + "," + empId)
    this.store.dispatch(new ScheduleAction.CreateSchedule(
        { location, empId, placeName, checkindate }))
    this.router.navigate(['mySchedule/geospatial']);
  }



}