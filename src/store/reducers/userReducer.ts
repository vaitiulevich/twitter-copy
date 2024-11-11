import {
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CLEAR_ERROR,
  CLEAR_USER_DATA,
  GET_USER_DATA_FAILURE,
  GET_USER_DATA_SUCCESS,
  UPDATE_USER_DATA_FAILURE,
  UPDATE_USER_DATA_REQUEST,
  UPDATE_USER_DATA_SUCCESS,
  UserAction,
} from '@store/types/user/actionTypes';
import { Maybe } from 'yup';

export interface User {
  uid?: string;
  email: string;
  phone: string;
  dateBirth?: string;
  name?: string;
}

export interface UserState extends StatusRequest {
  user?: string;
  userId: string;
  userSlug: string;
  avatar?: null | string;
  profileImg?: null | string;
  dateBirth: string;
  email: string;
  name: string;
  password?: string;
  phone: string;
  description?: Maybe<string | undefined>;
  followers: string[];
  following: string[];
}

interface StatusRequest {
  loading?: boolean;
  error?: string | null;
  status?: string | null;
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
  loading: false,
  status: null,
  error: null,
};

const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case CLEAR_ERROR:
      return { ...state, error: null };
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, loading: false, ...action.payload, error: null };
    case CHANGE_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_USER_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CHANGE_PASSWORD_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_USER_DATA_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case UPDATE_USER_DATA_REQUEST:
      return { ...state, loading: true };
    case UPDATE_USER_DATA_SUCCESS:
      return { ...state, loading: false };
    case UPDATE_USER_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_USER_DATA:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
