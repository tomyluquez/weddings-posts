import { createReducer, on } from '@ngrx/store';
import { UserState } from '@app/core/models/user.model';
import { loadUser, setUser } from '../actions/user.actons';

export const initialState: UserState = {
  user: { userName: '', mail: '', photo: null },
  loading: true,
};

export const userReducer = createReducer(
  initialState,
  on(loadUser, (currentState) => ({ ...currentState, loading: true })),
  on(setUser, (currentState, { user }) => {
    return {
      ...currentState,
      user,
      loading: false,
    };
  })
);
