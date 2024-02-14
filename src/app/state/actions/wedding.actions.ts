import { Wedding, WeddingState } from '@app/core/models/wedding.model';
import { createAction, props } from '@ngrx/store';

export const weddingActionsType = {
  loadWedding: '[Wedding List] : Load Wedding',
  setWedding: '[Wedding List] : Set Wedding',
};

export const loadWedding = createAction(weddingActionsType.loadWedding);
export const setWedding = createAction(
  weddingActionsType.setWedding,
  props<{ wedding: any }>()
);
