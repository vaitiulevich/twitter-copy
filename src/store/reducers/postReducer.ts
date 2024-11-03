import { selectPostById } from '@store/selectors';
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  GET_POST_FAILURE,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  PostAction,
  SET_IS_MORE_POSTS,
  SET_LAST_VISIBLE,
  SET_TOTAL_POSTS,
  UPDATE_POST_LIKES_FAILURE,
} from '@store/types/posts/actionTypes';
import { select } from 'redux-saga/effects';
import { string } from 'yup';

export interface PostState {
  id?: string;
  files?: File[];
  postId: string;
  userId: string;
  userName: string;
  userSlug: string;
  timestamp: number;
  images?: string[];
  likes: string[];
  content: string[];
  userAvatar: string | null;
  isMorePosts?: boolean;
}
export interface PostsState {
  posts: PostState[];
  selectPost: PostState | null;
  loading: boolean;
  total: number;
  lastVisible: number | null;
  isMorePosts: boolean;
  error: null | string;
}
const initialState: PostsState = {
  posts: [],
  selectPost: null,
  loading: false,
  total: 0,
  lastVisible: null,
  isMorePosts: false,
  error: null,
};

const userReducer = (state = initialState, action: PostAction) => {
  switch (action.type) {
    case GET_POST_REQUEST:
      return { ...state, loading: true };
    case GET_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        selectPost: action.payload,
        error: null,
      };
    case GET_POST_FAILURE:
      return {
        ...state,
        loading: false,
        selectPosts: null,
        error: action.payload,
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        selectPosts: null,
        error: action.payload,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        loading: false,
        selectPosts: null,
        error: action.payload,
      };
    case UPDATE_POST_LIKES_FAILURE:
      return {
        ...state,
        loading: false,
        selectPosts: null,
        error: action.payload,
      };
    case DELETE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        selectPosts: null,
        error: action.payload,
      };
    case ADD_POST_REQUEST:
      return { ...state, loading: true };
    case DELETE_POST_REQUEST:
      return { ...state };
    case FETCH_POSTS_REQUEST:
      return { ...state, loading: true };
    case SET_IS_MORE_POSTS:
      return { ...state, isMorePosts: action.payload };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,
        loading: false,
        error: null,
      };
    case SET_TOTAL_POSTS:
      return { ...state, total: action.payload };
    case SET_LAST_VISIBLE:
      return { ...state, lastVisible: action.payload };
    case ADD_POST_SUCCESS:
      return { ...state, loading: false, error: null };
    default:
      return state;
  }
};

export default userReducer;
