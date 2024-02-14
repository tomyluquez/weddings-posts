import { WeddingState } from '@app/core/models/wedding.model';
import { createReducer, on } from '@ngrx/store';
import { loadWedding, setWedding } from '../actions/wedding.actions';

export const initialState: WeddingState = {
  wedding: {
    welcomeText: '',
    imageLogin: '',
    weddingName: '',
    husbandName: '',
    brideName: '',
    path: '',
    posts: [],
  },
  loading: false,
};

export const weddingReducer = createReducer(
  initialState,
  on(loadWedding, (currentState) => ({ ...currentState, loading: true })),
  on(setWedding, (currentState, { wedding }) => {
    return {
      ...currentState,
      wedding,
      loading: false,
    };
  })
);
