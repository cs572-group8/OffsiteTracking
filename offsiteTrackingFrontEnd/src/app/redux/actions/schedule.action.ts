import { Actions } from './user.action';
import { ISchedule } from './../../models/schedule.model';
import { Action } from '@ngrx/store';


export enum ActionTypes {
    CREATESCHEDULE = 'CREATE',
    DELETESCHEDULE= 'DELETE'
}


export class CreateSchedule implements Action {
    readonly type = ActionTypes.CREATESCHEDULE

    constructor(public payload: ISchedule) { }
}


export class DeleteSchedule implements Action {
    readonly type = ActionTypes.DELETESCHEDULE

    constructor() { }
}

export type Actions= CreateSchedule | DeleteSchedule