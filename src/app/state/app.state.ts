import { ActionReducerMap } from '@ngrx/store';
import { WeddingState } from '@app/core/models/wedding.model';
import { weddingReducer } from './reducers/wedding.reducers';
import { UserState } from '@app/core/models/user.model';
import { userReducer } from './reducers/user.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface AppState {
  weddingState: WeddingState;
  userState: UserState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  weddingState: weddingReducer,
  userState: userReducer,
};

export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({
    keys: ['weddingState', 'userState'], // Agrega las claves de los estados que deseas persistir
    rehydrate: true,
  })(reducer);
}
