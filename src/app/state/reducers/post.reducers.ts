import { PostsState } from '@app/core/models/post.model';
import { createReducer, on } from '@ngrx/store';
import {
  addPost,
  deletePost,
  editPost,
  addComment,
} from '@actions/posts.actions';

export const initialState: PostsState = {
  posts: [],
  loading: false,
};

export const postsReducer = createReducer(
  initialState,
  on(addPost, (currentState, post) => ({
    ...currentState,
    posts: [...currentState.posts, post],
  })),
  on(deletePost, (currentState, { publicationId }) => ({
    ...currentState,
    posts: currentState.posts.filter(
      (currentPost) => currentPost['publicationId'] !== publicationId
    ),
  }))
);

// export const postReducers = createReducer(
//   initialState,
//   on(editPost, (currentState, post) => ({
//     ...currentState,
//     posts: currentState.posts.map((currentPost) =>
//       currentPost['publicationId'] === post.publicationId ? post : currentPost
//     ),
//   })),
//   on(addComment, (currentState, ))
// )
