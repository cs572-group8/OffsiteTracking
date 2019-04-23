import { ISchedule } from './../../models/schedule.model';
import { Action } from '@ngrx/store';
import * as SchedulerAction from '../actions/schedule.action'
import { Scheduler } from 'rxjs';

export interface State {
    empId: string;
    location: string;
    placeName: string;
    checkindate: string;
    scheduleId:string
};
const initialState = {
    empId: '',
    location: '',
    placeName: '',
    checkindate: '',
    scheduleId:''
}

export function reducer(state: ISchedule = initialState, action: SchedulerAction.Actions) {
    switch (action.type) {
        case SchedulerAction.ActionTypes.CREATESCHEDULE:
            return Object.assign({}, state, action.payload);
        case SchedulerAction.ActionTypes.DELETESCHEDULE:
            return {
                empId: '',
                location: '',
                placeName: '',
                checkindate: '',
                scheduleId:'',
            }
        default:
            return state;
    }
}