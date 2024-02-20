export interface User {
  userName: string | null;
  mail: string | null;
}

export interface UserState {
  user: User;
  loading: boolean;
}
