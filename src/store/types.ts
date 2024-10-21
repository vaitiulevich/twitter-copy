import { AuthState } from './reducers/authRedicer';
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
}

export type InferValueTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;

export type RootState = {
  theme: ThemeState;
  auth: AuthState;
  user: UserState;
};

export type RootAction = AuthAction | UserAction | ThemeAction;
