import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  PostAction,
} from '@store/types/posts/actionTypes';

export interface PostState {
  loading: boolean;
}

const initialState: PostState = {
  loading: false,
};

const userReducer = (state = initialState, action: PostAction) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return { loading: true };
    case ADD_POST_SUCCESS:
      return { loading: false };
    default:
      return state;
  }
};

export default userReducer;
