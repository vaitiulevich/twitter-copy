import { PostState, UserState } from '@store/reducers/userReducer';

import { CLEAR_USER_DATA, SET_USER_DATA } from '../auth/actionTypes';
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  GET_USER_DATA_FAILURE,
  GET_USER_DATA_SUCCESS,
} from './actionTypes';

export type getUserDataAction = {
  type: typeof SET_USER_DATA;
  payload: { id: string };
};

export type getUserDataSuccessAction = {
  type: typeof GET_USER_DATA_SUCCESS;
  payload: UserState;
};
export type getUserDataFailureAction = {
  type: typeof GET_USER_DATA_FAILURE;
};

export type fetchPostsSuccessAction = {
  type: typeof FETCH_POSTS_SUCCESS;
  payload: PostState[];
};

export type fetchPostsAction = {
  type: typeof FETCH_POSTS_REQUEST;
  payload: { id: string };
};

export type clearUserDataAction = {
  type: typeof CLEAR_USER_DATA;
};

export type UserAction =
  | getUserDataAction
  | getUserDataSuccessAction
  | getUserDataFailureAction
  | fetchPostsSuccessAction
  | fetchPostsAction
  | clearUserDataAction;
