import * as actions from '@store/actions/otherUserActions';
import { InferValueTypes } from '@store/types';

export const FETCH_OTHER_USER_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_OTHER_USER_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_OTHER_USER_FAILURE = 'FETCH_USERS_FAILURE';

export const SET_FOLLOWING_STATUS = 'SET_FOLLOWING_STATUS';
export const SET_FOLLOWING_STATUS_SUCCESS = 'SET_FOLLOWING_STATUS_SUCCESS';
export const SET_FOLLOWING_STATUS_FAILURE = 'SET_FOLLOWING_STATUS_FAILURE';

export const CLEAR_OTHER_USER_DATA = 'CLEAR_OTHER_USER_DATA';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export type OtherUserAction = ReturnType<InferValueTypes<typeof actions>>;
