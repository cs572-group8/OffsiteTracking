import { Action } from '@ngrx/store';
import * as DetailActions from '../actions/detail.action'
import { IScheduleDetail } from 'src/app/models/scheduledetail.model';

export interface State {
    scheduleId: string;
    detail: boolean;
};
const initialState = {
    scheduleId: '',
    detail: false,
}

export function reducer(state: IScheduleDetail = initialState, action: DetailActions.Actions) {
    switch (action.type) {
        case DetailActions.ActionTypes.SAVE:
            return Object.assign({}, state, action.payload);
        case DetailActions.ActionTypes.DELETE:
            return {
                scheduleId: '',
                detail: false,
            };
        default:
            return state;
    }
}