import { ActionReducerMap } from '@ngrx/store';
import { WeddingState } from '@app/core/models/wedding.model';
import { weddingReducer } from './reducers/wedding.reducers';
import { UserState } from '@app/core/models/user.model';
import { userReducer } from './reducers/user.reducer';

export interface AppState {
  weddingState: WeddingState;
  userState: UserState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  weddingState: weddingReducer,
  userState: userReducer,
};
