import {
  CLEAR_USER_DATA,
  FETCH_POSTS_SUCCESS,
  GET_USER_DATA_SUCCESS,
  UserAction,
} from '@store/types/user/actionTypes';

export interface User {
  uid?: string;
  email: string;
  phone: string;
  dateBirth?: string;
  name?: string;
}

export interface UserState {
  user?: string;
  userId: string;
  userSlug: string;
  avatar: null | string;
  profileImg: null | string;
  dateBirth: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  description?: string;
  followers: string[];
  following: string[];
  posts: PostState[];
}

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

const initialState: UserState = {
  userId: '',
  userSlug: '@user',
  avatar: null,
  profileImg: null,
  dateBirth: '',
  email: '',
  name: 'user',
  password: '',
  phone: '',
  followers: [],
  following: [],
  posts: [],
};

const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case GET_USER_DATA_SUCCESS:
      return { ...state, ...action.payload };
    case FETCH_POSTS_SUCCESS:
      return { ...state, posts: action.payload };
    case CLEAR_USER_DATA:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
