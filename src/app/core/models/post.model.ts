import { FormControl } from '@angular/forms';

export interface Post {
  userName: string;
  publicationId: string;
  comment: string;
  image: string | unknown;
  date: Date;
  comments: Comments[];
  likes: string[];
}

export interface Comments {
  userName: string;
  comment: string;
  idComment: string;
}

export interface PostsState {
  posts: Post[];
  loading: boolean;
}

export interface FormPost {
  image?: FormControl<string | null | undefined>;
  comment?: FormControl<string | null | undefined>;
}
