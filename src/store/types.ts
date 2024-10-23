import { Maybe } from 'yup';

import { AuthState } from './reducers/authRedicer';
import { ThemeState } from './reducers/themeReducer';
import { PostState, UserState } from './reducers/userReducer';
import { AuthAction } from './types/auth/actionTypes';
import { ThemeAction } from './types/theme/actionTypes';
import { UserAction } from './types/user/actionTypes';

export interface User {
  email: string;
  phone: string;
  dateBirth: string;
  name: string;
  avatar?: string;
  profileImg?: string;
  description?: Maybe<string | undefined>;
}

export type InferValueTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;

export type RootState = {
  theme: ThemeState;
  auth: AuthState;
  user: UserState;
  post: { loading: boolean };
};

export type RootAction = AuthAction | UserAction | ThemeAction;
