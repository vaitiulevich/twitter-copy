import * as actions from '@store/actions/postActions';
import { InferValueTypes } from '@store/types';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';

export const GET_POST_REQUEST = 'GET_POST_REQUEST';
export const GET_POST_FAILURE = 'GET_POST_FAILURE';
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const UPDATE_POST_LIKES_REQUEST = 'UPDATE_POST_LIKES_REQUEST';
export const UPDATE_POST_LIKES_SUCCESS = 'UPDATE_POST_LIKES_SUCCESS';
export const UPDATE_POST_LIKES_FAILURE = 'UPDATE_POST_LIKES_FAILURE';

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const SET_LAST_VISIBLE = 'SET_LAST_VISIBLE';
export const SET_IS_MORE_POSTS = 'SET_IS_MORE_POSTS';
export const SET_TOTAL_POSTS = 'SET_TOTAL_POSTS';
export const GET_TOTAL_POSTS = 'GET_TOTAL_POSTS';

export type PostAction = ReturnType<InferValueTypes<typeof actions>>;
