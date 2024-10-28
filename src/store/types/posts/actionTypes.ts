import * as actions from '@store/actions/postActions';
import { InferValueTypes } from '@store/types';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const UPDATE_POST_LIKES_REQUEST = 'UPDATE_POST_LIKES_REQUEST';
export const UPDATE_POST_LIKES_SUCCESS = 'UPDATE_POST_LIKES_SUCCESS';
export const UPDATE_POST_LIKES_FAILURE = 'UPDATE_POST_LIKES_FAILURE';

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export type PostAction = ReturnType<InferValueTypes<typeof actions>>;
