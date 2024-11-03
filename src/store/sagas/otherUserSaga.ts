import {
  fetchOtherUserDataError,
  fetchOtherUserDataRequest,
  fetchOtherUserDataSuccess,
  setFollowingStatus,
  setFollowingStatusSuccess,
} from '@store/actions/otherUserActions';
import { searchRequest } from '@store/actions/searchActions';
import { RootState } from '@store/types';
import {
  FETCH_OTHER_USER_REQUEST,
  SET_FOLLOWING_STATUS,
} from '@store/types/otherUser/actionTypes';
import { fetchUserData } from '@store/utils/userUtils';
import { FirebaseError } from 'firebase/app';
import {
  arrayRemove,
  arrayUnion,
  doc,
  runTransaction,
} from 'firebase/firestore';
import { call, put, select, takeEvery } from 'redux-saga/effects';

import { db } from '../../firebase';

function* fetchOtherUserData(
  action: ReturnType<typeof fetchOtherUserDataRequest>
): Generator {
  try {
    const { id } = action.payload;
    const user = yield call(fetchUserData, id);
    yield put(fetchOtherUserDataSuccess(user));
  } catch (error) {
    if (error instanceof FirebaseError) {
      yield put(fetchOtherUserDataError('Error fetching user'));
    }
  }
}

function* handleFollowingStatus(
  action: ReturnType<typeof setFollowingStatus>
): Generator {
  const { isFollowing, id, originId, searchTerm } = action.payload;

  try {
    yield call(runTransaction, db, async (transaction) => {
      const targetUserRef = doc(db, 'users', id);
      const originUserRef = doc(db, 'users', originId);

      const targetUserDoc = await transaction.get(targetUserRef);
      const originUserDoc = await transaction.get(originUserRef);

      if (!targetUserDoc.exists() || !originUserDoc.exists()) {
        await put(fetchOtherUserDataError('Error fetching user'));
      }

      if (isFollowing) {
        transaction.update(targetUserRef, {
          followers: arrayRemove(originId),
        });
        transaction.update(originUserRef, {
          following: arrayRemove(id),
        });
      } else {
        transaction.update(targetUserRef, {
          followers: arrayUnion(originId),
        });
        transaction.update(originUserRef, {
          following: arrayUnion(id),
        });
      }
    });

    const { userId } = yield select(
      (state: RootState) => state.otherUser.otherUser
    );
    if (userId === id && searchTerm) {
      yield put(searchRequest(searchTerm.trim() ? searchTerm : ''));
      yield put(fetchOtherUserDataRequest(id));
      return;
    }

    if (searchTerm) {
      yield put(searchRequest(searchTerm.trim() ? searchTerm : ''));
    } else {
      yield put(fetchOtherUserDataRequest(id));
    }
    yield put(setFollowingStatusSuccess());
  } catch (error) {
    yield put(fetchOtherUserDataError('Error unsubscribing'));
  }
}

export function* watchSetFollowingStatus() {
  yield takeEvery(SET_FOLLOWING_STATUS, handleFollowingStatus);
}

export function* watchFetchOtherUserData() {
  yield takeEvery(FETCH_OTHER_USER_REQUEST, fetchOtherUserData);
}
