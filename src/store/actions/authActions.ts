import { User } from '@store/reducers/authRedicer';
import {
  CHECK_USER_EXISTS,
  CLEAR_TOKENS,
  GOOGLE_LOGIN_FAILURE,
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_LOGIN_SUCCESS,
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
  SET_TOKENS,
  SET_USER_DATA,
} from '@store/types/auth/actionTypes';

export const resetError = () => ({
  type: RESET_ERROR,
});

export const checkUserExists = (user: User) => ({
  type: CHECK_USER_EXISTS,
  payload: { user },
});

export const setTokens = (accessToken: string, refreshToken: string) => ({
  type: SET_TOKENS,
  payload: { accessToken, refreshToken },
});

export const resetNavigatePassword = () => ({
  type: RESET_NAVIGATE_PASSWORD,
});
export const navigateToSetPassword = () => ({
  type: NAVIGATE_TO_SET_PASSWORD,
});
export const claerTokens = () => ({
  type: CLEAR_TOKENS,
});

export const setUserData = (user: User) => ({
  type: SET_USER_DATA,
  payload: user,
});

export const loginRequest = (email: string, password: string) => ({
  type: LOGIN_REQUEST,
  payload: { email, password },
});

export const loginSuccess = (email: string, uid: string) => ({
  type: LOGIN_SUCCESS,
  payload: { email, uid },
});

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailure = (error: string) => ({
  type: LOGOUT_FAILURE,
  payload: error,
});

export const registerRequest = (
  email: string,
  phone: string,
  password: string,
  dateBirth: string,
  name: string
) => ({
  type: REGISTER_REQUEST,
  payload: { email, phone, password, dateBirth, name },
});

export const registerSuccess = (user: string) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error: string) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const googleLoginRequest = () => ({ type: GOOGLE_LOGIN_REQUEST });
export const googleLoginSuccess = (user: User) => ({
  type: GOOGLE_LOGIN_SUCCESS,
  payload: user,
});
export const googleLoginFailure = (error: string) => ({
  type: GOOGLE_LOGIN_FAILURE,
  payload: error,
});
