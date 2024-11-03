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
export const changePasswordSuccess = (status: string | null) =>
  ({
    type: actions.CHANGE_PASSWORD_SUCCESS,
    payload: { status },
  }) as const;

export const changePasswordFailure = (error: string | null) =>
  ({
    type: actions.CHANGE_PASSWORD_FAILURE,
    payload: error,
  }) as const;

export const updateUserDataRequest = (
  userId: string,
  userData: Omit<User, 'email'> & ProfileFiles,
  closeModal?: () => void
) =>
  ({
    type: actions.UPDATE_USER_DATA_REQUEST,
    payload: { userData, userId, closeModal },
  }) as const;

export const updateUserDataSuccess = () =>
  ({
    type: actions.UPDATE_USER_DATA_SUCCESS,
  }) as const;
export const updateUserDataFailure = (error: string | null) =>
  ({
    type: actions.UPDATE_USER_DATA_FAILURE,
    payload: error,
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

export const getUserDataFailure = (error: string | null) =>
  ({
    type: actions.GET_USER_DATA_FAILURE,
    payload: error,
  }) as const;

export const clearUserData = () =>
  ({
    type: actions.CLEAR_USER_DATA,
  }) as const;
