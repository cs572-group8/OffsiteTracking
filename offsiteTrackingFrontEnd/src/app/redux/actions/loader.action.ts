import { Action } from '@ngrx/store';
import { ILoader } from 'src/app/models/loader.model';

export enum ActionTypes {
    CHANGECOUNTER = 'CHANGE'
}

export class Change implements Action {
    readonly type = ActionTypes.CHANGECOUNTER
    constructor(public payload: ILoader) { }
}

export type Actions = Change