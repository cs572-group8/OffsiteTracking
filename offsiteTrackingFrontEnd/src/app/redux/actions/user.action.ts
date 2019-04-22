import { Action } from '@ngrx/store';
import { IUser } from 'src/app/models/user.model';

export enum ActionTypes {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT'
}

export class Login implements Action {
    readonly type = ActionTypes.LOGIN

    constructor(public payload: IUser) { }
}

export class Logout implements Action {
    readonly type = ActionTypes.LOGOUT;
    constructor() { }
}

export type Actions = Login | Logout