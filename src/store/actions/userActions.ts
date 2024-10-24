import { PostState } from '@store/reducers/userReducer';
import { ProfileFiles, User } from '@store/types';
import * as types from '@store/types/user/actionTypes';

export const updateUserDataRequest = (
  userId: string,
  userData: Omit<User, 'email'> & ProfileFiles
) =>
  ({
    type: types.UPDATE_USER_DATA_REQUEST,
    payload: { userData, userId },
  }) as const;

export const updateUserDataSuccess = () =>
  ({
    type: types.UPDATE_USER_DATA_SUCCESS,
  }) as const;
export const updateUserDataFailure = () =>
  ({
    type: types.UPDATE_USER_DATA_FAILURE,
  }) as const;

export const getUserData = (id: string) =>
  ({
    type: types.GET_USER_DATA,
    payload: id,
  }) as const;

export const getUserDataSuccess = (user: User) =>
  ({
    type: types.GET_USER_DATA_SUCCESS,
    payload: user,
  }) as const;

export const getUserDataFailure = () =>
  ({
    type: types.GET_USER_DATA_FAILURE,
  }) as const;
export const fetchPostsSuccess = (posts: PostState[]) =>
  ({
    type: types.FETCH_POSTS_SUCCESS,
    payload: posts,
  }) as const;

export const clearUserData = () =>
  ({
    type: types.CLEAR_USER_DATA,
  }) as const;
