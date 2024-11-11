import { UserState } from '@store/reducers/userReducer';
import * as types from '@store/types/auth/actionTypes';

export const loginRequest = (
  type: 'phone' | 'email',
  login: string,
  password: string
) =>
  ({
    type: types.LOGIN_REQUEST,
    payload: { type, login, password },
  }) as const;

export const loginSuccess = (
  email: string,
  uid: string,
  endSessionTimestamp: number
) =>
  ({
    type: types.LOGIN_SUCCESS,
    payload: { email, uid, endSessionTimestamp },
  }) as const;

export const loginFailure = (error: string) =>
  ({
    type: types.LOGIN_FAILURE,
    payload: error,
  }) as const;

export const logoutRequest = () =>
  ({
    type: types.LOGOUT_REQUEST,
  }) as const;

export const logoutSuccess = () =>
  ({
    type: types.LOGOUT_SUCCESS,
  }) as const;

export const logoutFailure = (error: string | null) =>
  ({
    type: types.LOGOUT_FAILURE,
    payload: error,
  }) as const;

export const checkUserExists = (user: UserState) =>
  ({
    type: types.CHECK_USER_EXISTS,
    payload: { user },
  }) as const;

export const checkUserExistsFailure = (error: string) =>
  ({
    type: types.CHECK_USER_EXISTS_FAILURE,
    payload: { error },
  }) as const;

export const checkUserExistsSuccess = (user: UserState) =>
  ({
    type: types.CHECK_USER_EXISTS_SUCCESS,
    payload: { user },
  }) as const;

export const resetError = () =>
  ({
    type: types.RESET_ERROR,
  }) as const;
export const resetUserExist = () =>
  ({
    type: types.RESET_USER_EXISTS,
  }) as const;

export const registerRequest = (user: UserState & { password: string }) =>
  ({
    type: types.REGISTER_REQUEST,
    payload: { user },
  }) as const;

export const registerSuccess = (user: string) =>
  ({
    type: types.REGISTER_SUCCESS,
    payload: user,
  }) as const;

export const registerFailure = (error: string) =>
  ({
    type: types.REGISTER_FAILURE,
    payload: error,
  }) as const;
export const googleLoginRequest = () =>
  ({ type: types.GOOGLE_LOGIN_REQUEST }) as const;
export const googleLogupRequest = () =>
  ({ type: types.GOOGLE_LOGUP_REQUEST }) as const;
export const googleLoginSuccess = (user: UserState) =>
  ({
    type: types.GOOGLE_LOGIN_SUCCESS,
    payload: user,
  }) as const;
export const resetAuthUser = () =>
  ({
    type: types.RESET_AUTH_USER,
  }) as const;
export const googleLoginFailure = (error: string) =>
  ({
    type: types.GOOGLE_LOGIN_FAILURE,
    payload: error,
  }) as const;
