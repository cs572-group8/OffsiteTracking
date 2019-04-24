import {
    ActionReducer,
    ActionReducerMap,
    MetaReducer
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as userReducer from './user.reducer'
import * as scheduleReducer from './schedule.reducer'
import * as detailReducer from './detail.reducer'
import * as loaderReducer from './loader.reducer'
import { environment } from '../../../environments/environment';

export interface State {
    user: userReducer.State,
    schedule: scheduleReducer.State,
    detail: detailReducer.State,
    loader: loaderReducer.State
}

export const reducers: ActionReducerMap<State> = {
    user: userReducer.reducer,
    schedule: scheduleReducer.reducer,
    detail: detailReducer.reducer,
    loader: loaderReducer.reducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
        keys: ['user', 'detail', 'loader'],
        rehydrate: true
    })(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [localStorageSyncReducer] : [localStorageSyncReducer];