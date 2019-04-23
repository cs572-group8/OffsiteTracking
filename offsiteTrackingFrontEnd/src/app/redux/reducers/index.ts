import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as userReducer from './user.reducer'
import * as scheduleReducer from './schedule.reducer'
import { environment } from '../../../environments/environment';
export interface State {
    user: userReducer.State,
    schedule:scheduleReducer.State
}

export const reducers: ActionReducerMap<State> = {
    user: userReducer.reducer,
    schedule: scheduleReducer.reducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
        keys: ['user'],
        rehydrate: true
    })(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [localStorageSyncReducer] : [localStorageSyncReducer];