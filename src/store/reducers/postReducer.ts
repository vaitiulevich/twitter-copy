import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  FETCH_POSTS_SUCCESS,
  PostAction,
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
  content: string;
  userAvatar: string | null;
}
export interface PostsState {
  posts: PostState[];
  loading: boolean;
}
const initialState: PostsState = {
  posts: [],
  loading: false,
};

const userReducer = (state = initialState, action: PostAction) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return { ...state, loading: true };
    case FETCH_POSTS_SUCCESS:
      return { ...state, posts: action.payload };
    case ADD_POST_SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default userReducer;
