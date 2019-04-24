import { Action } from '@ngrx/store';
import * as LoaderActions from '../actions/loader.action'
import { ILoader } from 'src/app/models/loader.model';

export interface State {
    counter: number
};
const initialState = {
    counter: 0
}

export function reducer(state: ILoader = initialState, action: LoaderActions.Actions) {
    switch (action.type) {
        case LoaderActions.ActionTypes.CHANGECOUNTER:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}