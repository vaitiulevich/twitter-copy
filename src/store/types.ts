import { Maybe } from 'yup';

import authReducer, { AuthState } from './reducers/authRedicer';
import otherUserReducer, { OtherUserState } from './reducers/otherUserReducer';
import popUpReducer, { PopUpState } from './reducers/popUpReducer';
import userReducer, { PostsState } from './reducers/postReducer';
import postReducer from './reducers/postReducer';
import searchReducer, { SearchState } from './reducers/searchReducer';
import { ThemeState } from './reducers/themeReducer';
import { UserState } from './reducers/userReducer';
import { AuthAction } from './types/auth/actionTypes';
import { OtherUserAction } from './types/otherUser/actionTypes';
import { PopUpAction } from './types/popUp/actionTypes';
import { PostAction } from './types/posts/actionTypes';
import { SearchAction } from './types/search/actionTypes';
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

export interface RootReducerState {
  theme?: (state: ThemeState | undefined, action: ThemeAction) => ThemeState;
  auth?: (
    state: AuthState | undefined,
    action: AuthAction
  ) => AuthState | ReturnType<typeof authReducer>;
  user?: (
    state: UserState | undefined,
    action: UserAction
  ) => UserState | ReturnType<typeof userReducer>;
  posts?: (
    state: PostsState | undefined,
    action: PostAction
  ) => PostsState | ReturnType<typeof postReducer>;
  otherUser?: (
    state: OtherUserState | undefined,
    action: OtherUserAction
  ) => OtherUserState | ReturnType<typeof otherUserReducer>;
  search?: (
    state: SearchState | undefined,
    action: SearchAction
  ) => SearchState | ReturnType<typeof searchReducer>;
  popup?: (
    state: PopUpState | undefined,
    action: PopUpAction
  ) => PopUpState | ReturnType<typeof popUpReducer>;
}
