import { Maybe } from 'yup';

import { AuthState } from './reducers/authRedicer';
import { OtherUserState } from './reducers/otherUserReducer';
import { PostsState } from './reducers/postReducer';
import { SearchState } from './reducers/searchReducer';
import { ThemeState } from './reducers/themeReducer';
import { UserState } from './reducers/userReducer';
import { AuthAction } from './types/auth/actionTypes';
import { ThemeAction } from './types/theme/actionTypes';
import { UserAction } from './types/user/actionTypes';

export interface User {
  email: string;
  phone: string;
  dateBirth: string;
  name: string;
  avatar?: string | null;
  profileImg?: string | null;
  description?: Maybe<string | undefined>;
}

export interface ProfileFiles {
  avatarFile?: File;
  bannerFile?: File;
}

export type InferValueTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;

export type RootState = {
  theme: ThemeState;
  auth: AuthState;
  user: UserState;
  posts: PostsState;
  otherUser: OtherUserState;
  search: SearchState;
};

export type RootAction = AuthAction | UserAction | ThemeAction;
