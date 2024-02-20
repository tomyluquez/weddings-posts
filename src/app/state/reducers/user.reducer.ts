import { createReducer, on } from '@ngrx/store';
import { loadWedding, setWedding } from '../actions/wedding.actions';
import { UserState } from '@app/core/models/user.model';
import { loadUser, setUser } from '../actions/user.actons';
import { User } from './../../core/models/user.model';

export const initialState: UserState = {
  user: { userName: '', mail: '' },
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
