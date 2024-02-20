import { UserState } from '@app/core/models/user.model';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectUserStore = createFeatureSelector<UserState>('userState');

export const selectInfoUser = createSelector(
  selectUserStore,
  (state: UserState) => state.user
);
