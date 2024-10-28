import { User } from '@store/types';
import {
  CLEAR_ERROR,
  CLEAR_OTHER_USER_DATA,
  FETCH_OTHER_USER_FAILURE,
  FETCH_OTHER_USER_REQUEST,
  FETCH_OTHER_USER_SUCCESS,
  OtherUserAction,
  SET_FOLLOWING_STATUS,
  SET_FOLLOWING_STATUS_SUCCESS,
} from '@store/types/otherUser/actionTypes';

interface StatusRequest {
  loading?: boolean;
  error?: string | null;
  status?: string | null;
}
export interface OtherUserState extends StatusRequest {
  otherUser:
    | (User & { userSlug: string; following: string[]; followers: string[] })
    | null;
}
const initialState: OtherUserState = {
  otherUser: null,
  loading: false,
  error: null,
};

const otherUserReducer = (state = initialState, action: OtherUserAction) => {
  switch (action.type) {
    case CLEAR_ERROR:
      return { ...state, error: null };
    case CLEAR_OTHER_USER_DATA:
      return initialState;
    case FETCH_OTHER_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_OTHER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        otherUser: action.payload.user,
      };
    case FETCH_OTHER_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        otherUser: null,
      };
    case SET_FOLLOWING_STATUS:
      return { ...state, loading: true, error: null };
    case SET_FOLLOWING_STATUS_SUCCESS:
      return { ...state, loading: false, error: null };
    default:
      return state;
  }
};

export default otherUserReducer;