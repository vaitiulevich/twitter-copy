import { sessionPeriod } from '@constants/constants';
import { loginSuccess, logoutRequest } from '@store/actions/authActions';
import { fetchPostsRequest } from '@store/actions/postActions';
import {
  getUserData,
  getUserDataSuccess,
  updateUserDataRequest,
} from '@store/actions/userActions';
import {
  GET_USER_DATA,
  UPDATE_USER_DATA_REQUEST,
} from '@store/types/user/actionTypes';
import { FirebaseError } from 'firebase/app';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { eventChannel } from 'redux-saga';
import { call, put, take, takeEvery } from 'redux-saga/effects';

import { auth, db } from '../../firebase';
import { uploadImages } from './postSagas';

function createAuthChannel() {
  return eventChannel((emit) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const lastSignInTime = user.metadata.lastSignInTime;
        const endSessionTimestamp = lastSignInTime
          ? new Date(lastSignInTime).getTime() + sessionPeriod
          : 0;

        emit(loginSuccess(user.email || '', user.uid, endSessionTimestamp));
      } else {
        emit(logoutRequest());
      }
    });
    return () => unsubscribe();
  });
}

function* watchAuthState(): Generator {
  const channel = yield call(createAuthChannel);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}
export function* fetchUserData(id: string): Generator {
  const userDocRef = doc(db, 'users', id);
  const userDoc = yield getDoc(userDocRef);
  const userData = userDoc.data();

  if (userData) {
    delete userData.password;
    return userData;
  }
  throw new Error('User not found');
}

function* getUserDataRequest(
  action: ReturnType<typeof getUserData>
): Generator {
  const id = action.payload;
  try {
    const userData = yield call(fetchUserData, id);
    yield put(getUserDataSuccess(userData));
    yield put(fetchPostsRequest(id));
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error.message);
    }
  }
}

function* updateUserData(
  action: ReturnType<typeof updateUserDataRequest>
): Generator {
  try {
    const { avatarFile, bannerFile, ...userData } = action.payload.userData;
    let postData = { ...userData };

    if (avatarFile) {
      const imageUrls = yield call(uploadImages, [avatarFile]);
      postData = { ...postData, avatar: imageUrls[0] };
    }
    if (bannerFile) {
      const imageUrls = yield call(uploadImages, [bannerFile]);
      postData = { ...postData, profileImg: imageUrls[0] };
    }
    const userDocRef = doc(db, 'users', action.payload.userId);
    yield updateDoc(userDocRef, postData);
  } catch (error) {
    console.error(error);
  }
}

export function* watchAuth() {
  yield call(watchAuthState);
}

export function* watchUserData() {
  yield takeEvery(GET_USER_DATA, getUserDataRequest);
}

export function* watchUpdateUserData() {
  yield takeEvery(UPDATE_USER_DATA_REQUEST, updateUserData);
}
