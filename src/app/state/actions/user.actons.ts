import { User } from '@app/core/models/user.model';
import { createAction, props } from '@ngrx/store';

export const userActionsType = {
  loadUser: '[User List] : Load User',
  setUser: '[User List] : Set User',
};

export const loadUser = createAction(userActionsType.loadUser);
export const setUser = createAction(
  userActionsType.setUser,
  props<{ user: User }>()
);
