import { Post } from '@app/core/models/post.model';
import { Wedding, WeddingState } from '@app/core/models/wedding.model';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectWedding =
  createFeatureSelector<WeddingState>('weddingState');

export const selectInfoWedding = createSelector(
  selectWedding,
  (state: WeddingState) => state.wedding
);

export const pathWedding = createSelector(
  selectWedding,
  (state: WeddingState) => state.wedding.path
);

export const selectIndividualPost = createSelector(
  selectWedding,
  (state: WeddingState) => state.wedding.posts
);

// export const selectCollectionState = createFeatureSelector<
//   ReadonlyArray<string>
// >('collection');

// export const selectBookCollection = createSelector(
//   selectBooks,
//   selectCollectionState,
//   (books, collection) => {
//     return collection.map((id) => books.find((book) => book.id === id)!);
//   }
// );
