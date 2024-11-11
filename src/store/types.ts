import { AuthState } from './reducers/authRedicer';
import { OtherUserState } from './reducers/otherUserReducer';
import { PopUpState } from './reducers/popUpReducer';
import { PostsState } from './reducers/postReducer';
import { SearchState } from './reducers/searchReducer';
import { ThemeState } from './reducers/themeReducer';
import { UserState } from './reducers/userReducer';
import { AuthAction } from './types/auth/actionTypes';
import { OtherUserAction } from './types/otherUser/actionTypes';
import { PopUpAction } from './types/popUp/actionTypes';
import { PostAction } from './types/posts/actionTypes';
import { SearchAction } from './types/search/actionTypes';
import { ThemeAction } from './types/theme/actionTypes';
import { UserAction } from './types/user/actionTypes';

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
  popup: PopUpState;
};
export type RootAction =
  | ThemeAction
  | AuthAction
  | UserAction
  | PostAction
  | OtherUserAction
  | SearchAction
  | PopUpAction;
