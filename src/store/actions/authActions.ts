import { User } from '@store/reducers/authRedicer';

export const SET_TOKENS = 'SET_TOKENS';
export const CLEAR_TOKENS = 'CLEAR_TOKENS';
export const SET_USER_DATA = 'SET_USER_DATA';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const CHECK_USER_EXISTS = 'CHECK_USER_EXISTS';

export const checkUserExists = (user: User) => ({
  type: CHECK_USER_EXISTS,
  payload: { user },
});

export const setTokens = (accessToken: string, refreshToken: string) => ({
  type: SET_TOKENS,
  payload: { accessToken, refreshToken },
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

export const loginSuccess = (email: string, user: string) => ({
  type: LOGIN_SUCCESS,
  payload: { email, user },
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
  password: string
) => ({
  type: REGISTER_REQUEST,
  payload: { email, phone, password },
});

export const registerSuccess = (user: string) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error: string) => ({
  type: REGISTER_FAILURE,
  payload: error,
});
