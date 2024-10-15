import {
  CHECK_USER_EXISTS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SET_USER_DATA,
} from './actions/authActions';
import { User } from './reducers/authRedicer';

export type Theme = 'light' | 'dark';

export interface ThemeState {
  theme: Theme;
}
export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
  loading: boolean;
  user: User | null;
  isAuthenticated: boolean;
}

export interface ToggleThemeAction {
  type: 'TOGGLE_THEME_REQUEST';
}

export interface ToggleThemeSuccessAction {
  type: 'TOGGLE_THEME_SUCCESS';
}

export type ThemeAction = ToggleThemeAction | ToggleThemeSuccessAction;

export interface RootState {
  theme: ThemeState;
  auth: AuthState;
}

export interface SetTokensAction {
  type: 'SET_TOKENS';
  payload: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface ClearTokensAction {
  type: 'CLEAR_TOKENS';
}
export interface SignInAction {
  type: 'SIGN_IN';
  payload: {
    email: string;
    password: string;
  };
}

export interface LogOutAction {
  type: typeof LOGOUT_REQUEST;
}
export interface RegisterAction {
  payload: { email: string; phone: string; password: string };
  type: typeof REGISTER_REQUEST;
}

export interface CheckUserAction {
  payload: { user: User };
  type: typeof CHECK_USER_EXISTS;
}

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
  payload: { email: string; password: string };
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: { uid: string; email: string | null };
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string;
}

interface LogOutRequestAction {
  type: typeof LOGOUT_REQUEST;
}

interface LogOutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

interface LogOutFailureAction {
  type: typeof LOGOUT_FAILURE;
  payload: string;
}

interface registerRequestAction {
  type: typeof REGISTER_REQUEST;
  payload: { email: string; phone: string; password: string };
}
interface registerSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: string;
}
interface registerFailureAction {
  type: typeof REGISTER_FAILURE;
  payload: string;
}

interface setUserDataAction {
  type: typeof SET_USER_DATA;
  payload: User;
}

export type AuthAction =
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
