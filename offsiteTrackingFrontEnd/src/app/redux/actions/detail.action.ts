import { Action } from '@ngrx/store';
import { IScheduleDetail } from 'src/app/models/scheduledetail.model';

export enum ActionTypes {
    SAVE = 'SAVE',
    DELETE = 'DELETE'
}

export class SaveDetail implements Action {
    readonly type = ActionTypes.SAVE

    constructor(public payload: IScheduleDetail) { }
}

export class DeleteDetail implements Action {
    readonly type = ActionTypes.DELETE;
    constructor() { }
}

export type Actions = SaveDetail | DeleteDetail