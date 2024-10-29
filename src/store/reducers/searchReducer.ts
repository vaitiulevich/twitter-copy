import { User } from '@store/types';
import {
  SEARCH_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SearchAction,
} from '@store/types/search/actionTypes';

import { PostState } from './postReducer';

interface StatusRequest {
  loading?: boolean;
  error?: string | null;
}

interface UserSearch extends User {
  id: number;
  userSlug?: string;
}
export interface SearchState extends StatusRequest {
  users: UserSearch[];
  posts: PostState[];
}
const initialState: SearchState = {
  users: [],
  posts: [],
  loading: false,
  error: null,
};

const searchReducer = (state = initialState, action: SearchAction) => {
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
