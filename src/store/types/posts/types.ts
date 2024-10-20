import { PostState } from '@store/reducers/userReducer';

import { ADD_POST_REQUEST, UPDATE_POST_LIKES_REQUEST } from './actionTypes';

export type addPostRequest = {
  type: typeof ADD_POST_REQUEST;
  payload: PostState;
};

export type updatePostLikesRequest = {
  type: typeof UPDATE_POST_LIKES_REQUEST;
  payload: { postId: string; likes: string[] };
};
