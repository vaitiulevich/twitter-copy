import { User } from '@store/reducers/authRedicer';

import {
  CHECK_USER_EXISTS,
  GOOGLE_LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  NAVIGATE_TO_SET_PASSWORD,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_ERROR,
  RESET_NAVIGATE_PASSWORD,
  SET_USER_DATA,
} from './actionTypes';

export type AuthState = {
  uid?: string;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
  loading: boolean;
  user: User | null;
  isAuthenticated: boolean;
  navigateToSetPassword: boolean;
};
export type SetTokensAction = {
  type: 'SET_TOKENS';
  payload: {
    accessToken: string;
    refreshToken: string;
  };
};
export type ClearTokensAction = {
  type: 'CLEAR_TOKENS';
};
export type SignInAction = {
  type: 'SIGN_IN';
  payload: {
    email: string;
    password: string;
  };
};
export type LogOutAction = {
  type: typeof LOGOUT_REQUEST;
};
export type RegisterAction = {
  payload: {
    email: string;
    phone: string;
    password: string;
    name: string;
    dateBirth: string;
  };
  type: typeof REGISTER_REQUEST;
};
export type googleLoginRequest = {
  type: typeof GOOGLE_LOGIN_REQUEST;
};
export type CheckUserAction = {
  payload: { user: User };
  type: typeof CHECK_USER_EXISTS;
};

type LoginRequestAction = {
  type: typeof LOGIN_REQUEST;
  payload: { email: string; password: string };
};

type LoginSuccessAction = {
  type: typeof LOGIN_SUCCESS;
  payload: { uid: string; email: string | null };
};

type LoginFailureAction = {
  type: typeof LOGIN_FAILURE;
  payload: string;
};

type LogOutRequestAction = {
  type: typeof LOGOUT_REQUEST;
};

type LogOutSuccessAction = {
  type: typeof LOGOUT_SUCCESS;
};

type LogOutFailureAction = {
  type: typeof LOGOUT_FAILURE;
  payload: string;
};

type registerRequestAction = {
  type: typeof REGISTER_REQUEST;
  payload: { email: string; phone: string; password: string };
};
type registerSuccessAction = {
  type: typeof REGISTER_SUCCESS;
  payload: string;
};
type registerFailureAction = {
  type: typeof REGISTER_FAILURE;
  payload: string;
};
export type resetError = {
  type: typeof RESET_ERROR;
};

export type resetNavigatePassword = {
  type: typeof RESET_NAVIGATE_PASSWORD;
};

export type navigateToSetPasswordPassword = {
  type: typeof NAVIGATE_TO_SET_PASSWORD;
};
export type setUserDataAction = {
  type: typeof SET_USER_DATA;
  payload: User;
};
export type AuthAction =
  | resetNavigatePassword
  | navigateToSetPasswordPassword
  | resetError
  | SetTokensAction
  | ClearTokensAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogOutRequestAction
  | LogOutSuccessAction
  | LogOutFailureAction
  | registerRequestAction
  | registerSuccessAction
  | registerFailureAction
  | setUserDataAction;
