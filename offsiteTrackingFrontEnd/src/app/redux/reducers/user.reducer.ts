import { Action } from '@ngrx/store';
import * as UserActions from '../actions/user.action'
import { IUser } from 'src/app/models/user.model';

export interface State {
    name: string;
    userType: string;
    email:string
};
const initialState = {
    name: '',
    userType: '',
    email:''
}

export function reducer(state: IUser = initialState, action: UserActions.Actions) {
    switch (action.type) {
        case UserActions.ActionTypes.LOGIN:
            return Object.assign({}, state, action.payload);
        case UserActions.ActionTypes.LOGOUT:
            return { name: "", userType: "", email:"" };
        default:
            return state;
    }
}