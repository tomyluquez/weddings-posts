import { PostsState } from '@app/core/models/post.model';
import { ActionReducerMap } from '@ngrx/store';
import { postsReducer } from './reducers/post.reducers';
import { WeddingState } from '@app/core/models/wedding.model';
import { weddingReducer } from './reducers/wedding.reducers';

export interface AppState {
  weddingState: WeddingState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  weddingState: weddingReducer,
};
