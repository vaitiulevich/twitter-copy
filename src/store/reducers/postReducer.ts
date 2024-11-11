import { POSTS_PER_PAGE } from '@constants/constants';
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  GET_POST_FAILURE,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  LOAD_MORE_POSTS,
  PostAction,
  SET_IS_MORE_POSTS,
  UPDATE_POST_LIKES_FAILURE,
} from '@store/types/posts/actionTypes';
import { Reducer } from 'redux';

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
  visiblePostsCount: number;
  selectPost: PostState | null;
  loading: boolean;
  isMorePosts: boolean;
  error: null | string;
}
const initialState: PostsState = {
  posts: [],
  visiblePostsCount: POSTS_PER_PAGE,
  selectPost: null,
  loading: false,
  isMorePosts: true,
  error: null,
};

const userReducer: Reducer<PostsState, PostAction> = (
  state = initialState,
  action: PostAction
) => {
  switch (action.type) {
    case GET_POST_REQUEST:
      return { ...state, loading: true };
    case LOAD_MORE_POSTS:
      return {
        ...state,
        visiblePostsCount: action.payload,
        isMorePosts: action.payload < state.posts.length,
      };
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
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case FETCH_POSTS_REQUEST:
      return { ...state, loading: true };
    case SET_IS_MORE_POSTS:
      return { ...state, isMorePosts: action.payload };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,
        isMorePosts: action.payload.posts.length > 0,
        loading: false,
        error: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
