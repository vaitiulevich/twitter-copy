import { PostState } from '@store/reducers/userReducer';
import { ProfileFiles, User } from '@store/types';
import * as actions from '@store/types/user/actionTypes';

export const changePasswordRequest = (
  newPassword: string,
  oldPassword: string
) =>
  ({
    type: actions.CHANGE_PASSWORD_REQUEST,
    payload: { newPassword, oldPassword },
  }) as const;

export const clearError = () =>
  ({
    type: actions.CLEAR_ERROR,
  }) as const;
export const changePasswordSuccess = () =>
  ({
    type: actions.CHANGE_PASSWORD_SUCCESS,
  }) as const;

export const changePasswordFailure = (error: string) =>
  ({
    type: actions.CHANGE_PASSWORD_FAILURE,
    payload: error,
  }) as const;

export const updateUserDataRequest = (
  userId: string,
  userData: Omit<User, 'email'> & ProfileFiles
) =>
  ({
    type: actions.UPDATE_USER_DATA_REQUEST,
    payload: { userData, userId },
  }) as const;

export const updateUserDataSuccess = () =>
  ({
    type: actions.UPDATE_USER_DATA_SUCCESS,
  }) as const;
export const updateUserDataFailure = () =>
  ({
    type: actions.UPDATE_USER_DATA_FAILURE,
  }) as const;

export const getUserData = (id: string) =>
  ({
    type: actions.GET_USER_DATA,
    payload: id,
  }) as const;

export const getUserDataSuccess = (user: User) =>
  ({
    type: actions.GET_USER_DATA_SUCCESS,
    payload: user,
  }) as const;

export const getUserDataFailure = () =>
  ({
    type: actions.GET_USER_DATA_FAILURE,
  }) as const;
export const fetchPostsSuccess = (posts: PostState[]) =>
  ({
    type: actions.FETCH_POSTS_SUCCESS,
    payload: posts,
  }) as const;

export const clearUserData = () =>
  ({
    type: actions.CLEAR_USER_DATA,
  }) as const;
