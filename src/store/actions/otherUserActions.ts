import { UserState } from '@store/reducers/userReducer';
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

export const fetchOtherUserDataSuccess = (user: UserState) =>
  ({
    type: actions.FETCH_OTHER_USER_SUCCESS,
    payload: { user },
  }) as const;
export const fetchOtherUserDataError = (error: string | null) =>
  ({
    type: actions.FETCH_OTHER_USER_FAILURE,
    payload: { error },
  }) as const;

export const setFollowingStatus = (
  isFollowing: boolean,
  id: string,
  originId: string,
  searchTerm?: string
) =>
  ({
    type: actions.SET_FOLLOWING_STATUS,
    payload: { isFollowing, id, originId, searchTerm },
  }) as const;

export const setFollowingStatusSuccess = () =>
  ({
    type: actions.SET_FOLLOWING_STATUS_SUCCESS,
  }) as const;
