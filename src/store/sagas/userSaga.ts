import {
  changePasswordFailure,
  changePasswordRequest,
  changePasswordSuccess,
  getUserData,
  getUserDataSuccess,
  updateUserDataRequest,
  updateUserDataSuccess,
} from '@store/actions/userActions';
import {
  CHANGE_PASSWORD_REQUEST,
  GET_USER_DATA,
  UPDATE_USER_DATA_REQUEST,
} from '@store/types/user/actionTypes';
import { uploadImages } from '@store/utils/postsUtils';
import { createAuthChannel, fetchUserData } from '@store/utils/userUtils';
import { FirebaseError } from 'firebase/app';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { call, delay, put, take, takeEvery } from 'redux-saga/effects';

import { auth, db } from '../../firebase';

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
    const userData = yield call(fetchUserData, id);
    yield put(getUserDataSuccess(userData));
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
    const newUserData = yield call(fetchUserData, action.payload.userId);
    yield put(getUserDataSuccess(newUserData));
    yield put(updateUserDataSuccess());
  } catch (error) {
    console.error(error);
  }
  if (action.payload.closeModal) {
    action.payload.closeModal();
  }
}

function* changePasswordSaga(
  action: ReturnType<typeof changePasswordRequest>
): Generator {
  try {
    const user = auth.currentUser;
    if (user) {
      const credential = EmailAuthProvider.credential(
        user.email as string,
        action.payload.oldPassword
      );
      yield reauthenticateWithCredential(user, credential);
      yield call(updatePassword, user, action.payload.newPassword);

      const userRef = doc(db, 'users', user.uid);
      yield updateDoc(userRef, { password: action.payload.newPassword });

      yield put(changePasswordSuccess('success'));
      yield delay(3000);
      yield put(changePasswordSuccess(null));
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/invalid-credential') {
        yield put(changePasswordFailure('invalid old password'));
      }
    }
  }
}

export function* watchChangePassword() {
  yield takeEvery(CHANGE_PASSWORD_REQUEST, changePasswordSaga);
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
