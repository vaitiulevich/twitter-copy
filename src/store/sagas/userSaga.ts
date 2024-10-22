import { sessionPeriod } from '@constants/constants';
import { loginSuccess, logoutRequest } from '@store/actions/authActions';
import { fetchPostsRequest } from '@store/actions/postActions';
import { getUserData, getUserDataSuccess } from '@store/actions/userActions';
import { GET_USER_DATA } from '@store/types/user/actionTypes';
import { FirebaseError } from 'firebase/app';
import { doc, getDoc } from 'firebase/firestore';
import { eventChannel } from 'redux-saga';
import { call, put, take, takeEvery } from 'redux-saga/effects';

import { auth, db } from '../../firebase';

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

function* getUserDataRequest(
  action: ReturnType<typeof getUserData>
): Generator {
  const id = action.payload;
  try {
    const userDocRef = doc(db, 'users', `${id}`);
    const userDoc = yield getDoc(userDocRef);
    const userData = userDoc.data();
    delete userData.password;
    yield put(getUserDataSuccess(userData));
    yield put(fetchPostsRequest(id));
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error.message);
    }
  }
}

export function* watchAuth() {
  yield call(watchAuthState);
}

export function* watchUserData() {
  yield takeEvery(GET_USER_DATA, getUserDataRequest);
}
