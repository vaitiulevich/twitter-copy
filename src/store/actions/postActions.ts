import { PostState } from '@store/reducers/userReducer';
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  UPDATE_POST_LIKES_FAILURE,
  UPDATE_POST_LIKES_REQUEST,
  UPDATE_POST_LIKES_SUCCESS,
} from '@store/types/posts/actionTypes';

export const addPostRequest = (postData: PostState) => ({
  type: ADD_POST_REQUEST,
  payload: postData,
});

export const addPostSuccess = (post: PostState) => ({
  type: ADD_POST_SUCCESS,
  payload: post,
});

export const addPostFailure = () => ({
  type: ADD_POST_FAILURE,
});

export const updatePostLikesRequest = (postId: string, likes: string[]) => ({
  type: UPDATE_POST_LIKES_REQUEST,
  payload: { postId, likes },
});

export const updatePostLikesSuccess = () => ({
  type: UPDATE_POST_LIKES_SUCCESS,
});

export const updatePostLikesFailure = () => ({
  type: UPDATE_POST_LIKES_FAILURE,
});
