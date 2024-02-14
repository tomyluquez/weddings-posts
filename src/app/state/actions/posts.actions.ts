import { Comments, Post } from '@app/core/models/post.model';
import { createAction, props } from '@ngrx/store';

export const actionsType = {
  addPost: '[Post List] Add Post',
  deletePost: '[Post List] Delete Post',
  editPost: '[Post List] Edit Post',
  addComment: '[Post List] Add Comment',
};

export const addPost = createAction(actionsType.addPost, props<Post>());

export const deletePost = createAction(
  actionsType.deletePost,
  props<{ publicationId: string }>()
);

export const editPost = createAction(actionsType.editPost, props<Post>());

export const addComment = createAction(actionsType.addComment, props<Comments>);
