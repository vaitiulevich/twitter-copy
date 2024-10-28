import * as actions from '@store/actions/userActions';
import { InferValueTypes } from '@store/types';

export const GET_USER_DATA = 'GET_USER_DATA';
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILURE = 'GET_USER_DATA_FAILURE';

export const UPDATE_USER_DATA_REQUEST = 'UPDATE_USER_DATA_REQUEST';
export const UPDATE_USER_DATA_SUCCESS = 'UPDATE_USER_DATA_SUCCESS';
export const UPDATE_USER_DATA_FAILURE = 'UPDATE_USER_DATA_FAILURE';

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';

export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export type UserAction = ReturnType<InferValueTypes<typeof actions>>;
