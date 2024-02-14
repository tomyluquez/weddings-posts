import { Post } from './post.model';

export interface Wedding {
  welcomeText: string;
  imageLogin: string;
  weddingName: string;
  husbandName: string;
  brideName: string;
  path: string;
  posts: Post[];
}

export interface WeddingState {
  wedding: Wedding;
  loading: boolean;
}
