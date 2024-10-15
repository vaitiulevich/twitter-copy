import {
  CLEAR_TOKENS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SET_TOKENS,
  SET_USER_DATA,
} from '@store/actions/authActions';
import { AuthAction } from '@store/types';

export interface User {
  uid?: string;
  email: string;
  phone: string;
  dateBirth?: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  error: string | null;
  loading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  error: null,
  loading: false,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action: AuthAction) => {
  console.log(state, action);

  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, user: action.payload };
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuthenticated: true,
        error: null,
      };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SET_TOKENS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case CLEAR_TOKENS:
      return { ...state, accessToken: null, refreshToken: null };
    case LOGOUT_REQUEST:
      return { ...state, error: null, loading: true };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case REGISTER_REQUEST:
      return { ...state, loading: true, error: null };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
      };
    case REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
