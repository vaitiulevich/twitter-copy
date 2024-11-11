import { User } from '@store/types';
import {
  SEARCH_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SearchAction,
} from '@store/types/search/actionTypes';

import { PostState } from './postReducer';
import { UserState } from './userReducer';

interface StatusRequest {
  loading?: boolean;
  error?: string | null;
}

export interface UserSearch extends User {
  id: string;
  userSlug?: string;
}
export interface SearchState extends StatusRequest {
  users: UserState[] | null;
  posts: PostState[] | null;
}
const initialState: SearchState = {
  users: [],
  posts: [],
  loading: false,
  error: null,
};
// Type '(state: SearchState | undefined, action: SearchAction) => SearchState' is not assignable to type 'SearchState'.
const searchReducer = (
  state: SearchState = initialState,
  action: SearchAction
) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return { ...state, loading: true, error: null };
    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users,
        posts: action.payload.posts,
      };
    case SEARCH_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default searchReducer;
