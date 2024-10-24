import * as actions from '@store/actions/authActions';
import { InferValueTypes } from '@store/types';

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
export const CHECK_USER_EXISTS_SUCCESS = 'CHECK_USER_EXISTS_SUCCESS';
export const CHECK_USER_EXISTS_FAILURE = 'CHECK_USER_EXISTS_FAILURE';

export const RESET_ERROR = 'RESET_ERROR';
export const RESET_USER_EXISTS = 'RESET_USER_EXISTS';
export const RESET_AUTH_USER = 'RESET_AUTH_USER';

export const GOOGLE_LOGIN_REQUEST = 'GOOGLE_LOGIN_REQUEST';
export const GOOGLE_LOGIN_SUCCESS = 'GOOGLE_LOGIN_SUCCESS';
export const GOOGLE_LOGIN_FAILURE = 'GOOGLE_LOGIN_FAILURE';
export const GOOGLE_LOGUP_REQUEST = 'GOOGLE_LOGUP_REQUEST';

export type AuthAction = ReturnType<InferValueTypes<typeof actions>>;
