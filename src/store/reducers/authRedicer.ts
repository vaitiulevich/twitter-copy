import { User } from '@store/types';
import {
  AuthAction,
  CHECK_USER_EXISTS_FAILURE,
  CHECK_USER_EXISTS_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  RESET_ERROR,
  RESET_USER_EXISTS,
} from '@store/types/auth/actionTypes';

export type AuthState = {
  error: string | undefined;
  loading: boolean;
  navigateToSetPassword: boolean;
  uid: string | undefined;
  endSessionTimestamp: number | null;
  user?: User;
};

const initialState: AuthState = {
  error: undefined,
  loading: false,
  navigateToSetPassword: false,
  uid: undefined,
  endSessionTimestamp: null,
  user: undefined,
};

const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case RESET_ERROR:
      return {
        ...state,
        error: undefined,
      };
    case RESET_USER_EXISTS:
      return {
        ...state,
        navigateToSetPassword: false,
      };
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: undefined };
    case LOGIN_SUCCESS:
      return {
        ...state,
        uid: action.payload.uid,
        loading: false,
        endSessionTimestamp: action.payload.endSessionTimestamp,
        error: undefined,
      };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT_REQUEST:
      return { ...state, error: undefined, loading: true };
    case LOGOUT_SUCCESS:
      return { ...initialState };
    case LOGOUT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CHECK_USER_EXISTS_SUCCESS:
      return {
        ...state,
        navigateToSetPassword: true,
        user: action.payload.user,
      };
    case CHECK_USER_EXISTS_FAILURE:
      return { ...state, error: action.payload.error };
    case REGISTER_REQUEST:
      return {
        ...state,
        error: undefined,
      };
    case REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
