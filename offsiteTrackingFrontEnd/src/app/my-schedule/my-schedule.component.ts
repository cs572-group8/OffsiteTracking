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
  requestCounter: number = 0
  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<State>
  ) {
    this.store.pipe(select('loader')).subscribe((result: any) => {
      this.requestCounter = result.counter
    })
  }

  ngOnInit() {
    this.userService.getMySchedule(this.userService.getPayLoad()._id)
      .subscribe(
        (data) => this.mySchedule = data,
        err => {
          this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
        },
        () => {
          this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
        }
      );
  }

  Destination(empId, location, placeName, checkindate, scheduleId) {
    this.store.dispatch(new ScheduleAction.CreateSchedule(
      { location, empId, placeName, checkindate, scheduleId }))
    this.router.navigate(['mySchedule/geospatial']);
  }



}
