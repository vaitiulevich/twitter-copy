import { User } from '@store/types';
import * as actions from '@store/types/otherUser/actionTypes';

export const clearError = () =>
  ({
    type: actions.CLEAR_ERROR,
  }) as const;

export const clearOtherUserData = () =>
  ({
    type: actions.CLEAR_OTHER_USER_DATA,
  }) as const;

export const fetchOtherUserDataRequest = (id: string) =>
  ({
    type: actions.FETCH_OTHER_USER_REQUEST,
    payload: { id },
  }) as const;

export const fetchOtherUserDataSuccess = (user: User) =>
  ({
    type: actions.FETCH_OTHER_USER_SUCCESS,
    payload: { user },
  }) as const;
export const fetchOtherUserDataError = (error: string) =>
  ({
    type: actions.FETCH_OTHER_USER_FAILURE,
    payload: { error },
  }) as const;

export const setFollowingStatus = (
  isFollowing: boolean,
  id: string,
  originId: string
) =>
  ({
    type: actions.SET_FOLLOWING_STATUS,
    payload: { isFollowing, id, originId },
  }) as const;
export const setFollowingStatusSuccess = () =>
  ({
    type: actions.SET_FOLLOWING_STATUS_SUCCESS,
  }) as const;
