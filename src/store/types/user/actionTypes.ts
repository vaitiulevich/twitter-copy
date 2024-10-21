import * as actions from '@store/actions/userActions';
import { InferValueTypes } from '@store/types';

export const GET_USER_DATA = 'GET_USER_DATA';
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILURE = 'GET_USER_DATA_FAILURE';

export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';

export type UserAction = ReturnType<InferValueTypes<typeof actions>>;
