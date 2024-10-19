import { PostState, UserState } from '@store/reducers/userReducer';
import { CLEAR_USER_DATA } from '@store/types/auth/actionTypes';
import {
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  GET_USER_DATA,
  GET_USER_DATA_FAILURE,
  GET_USER_DATA_SUCCESS,
} from '@store/types/user/actionTypes';

export const getUserData = (id: string) => ({
  type: GET_USER_DATA,
  payload: id,
});

export const getUserDataSuccess = (user: UserState) => ({
  type: GET_USER_DATA_SUCCESS,
  payload: user,
});

export const getUserDataFailure = () => ({
  type: GET_USER_DATA_FAILURE,
});

export const fetchPostsRequest = (id: string) => ({
  type: FETCH_POSTS_REQUEST,
  payload: id,
});

export const fetchPostsSuccess = (posts: PostState[]) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const fetchPostsFailure = () => ({
  type: FETCH_POSTS_FAILURE,
});

export const clearUserData = () => ({
  type: CLEAR_USER_DATA,
});
