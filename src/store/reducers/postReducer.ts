import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  DELETE_POST_REQUEST,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  PostAction,
  SET_IS_MORE_POSTS,
  SET_LAST_VISIBLE,
  SET_TOTAL_POSTS,
} from '@store/types/posts/actionTypes';

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
  loading: boolean;
  total: number;
  lastVisible: number | null;
  isMorePosts: boolean;
}
const initialState: PostsState = {
  posts: [],
  loading: false,
  total: 0,
  lastVisible: null,
  isMorePosts: false,
};

const userReducer = (state = initialState, action: PostAction) => {
  switch (action.type) {
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
      };
    case SET_TOTAL_POSTS:
      return { ...state, total: action.payload };
    case SET_LAST_VISIBLE:
      return { ...state, lastVisible: action.payload };
    case ADD_POST_SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default userReducer;
