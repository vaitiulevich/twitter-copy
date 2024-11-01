import { INCORRECT_CREDS, USER_ALREDY_EXIST } from '@constants/messages';
import {
  checkUserExists,
  checkUserExistsFailure,
  checkUserExistsSuccess,
  loginFailure,
  loginRequest,
  logoutSuccess,
  registerFailure,
  registerRequest,
} from '@store/actions/authActions';
import { clearUserData, getUserData } from '@store/actions/userActions';
import {
  CHECK_USER_EXISTS,
  GOOGLE_LOGUP_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  REGISTER_REQUEST,
} from '@store/types/auth/actionTypes';
import {
  addUserToDatabase,
  checkDocUserExists,
  createUserData,
} from '@store/utils/authUtils';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { auth, db, provider } from '../../firebase';

function* signInSaga(action: ReturnType<typeof loginRequest>): Generator {
  try {
    const { type, login, password } = action.payload;
    if (type === 'email') {
      yield call(signInWithEmailAndPassword, auth, login, password);
    }
    if (type === 'phone') {
      const usersRef = collection(db, 'users');

      const phoneQuery = query(
        usersRef,
        where('phone', '==', login),
        where('password', '==', password)
      );
      const phoneExists = yield getDocs(phoneQuery);

      if (phoneExists.empty) {
        console.log(phoneExists);
        yield put(loginFailure(INCORRECT_CREDS));
      } else {
        phoneExists?.forEach((doc: any) => {
          const data = doc.data();
          if (data.email) {
            signInWithEmailAndPassword(auth, data.email, password);
          }
        });
      }
    }
  } catch (err) {
    if (err instanceof FirebaseError) {
      yield put(loginFailure(INCORRECT_CREDS));
    }
  }
}

function* logOutSaga(): Generator {
  try {
    yield call(signOut, auth);
    yield put(clearUserData());
    yield put(logoutSuccess());
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error);
    }
  }
}

function* registerSaga(action: ReturnType<typeof registerRequest>): Generator {
  const { email, password, ...regPayload } = action.payload.user;

  try {
    const userCredential = yield call(
      createUserWithEmailAndPassword,
      auth,
      email,
      password
    );
    const userData = createUserData(userCredential.user.uid, {
      ...regPayload,
      email,
      password,
    });
    yield call(addUserToDatabase, userCredential.user.uid, userData);
  } catch (err) {
    if (err instanceof FirebaseError) {
      yield put(registerFailure(err.message));
    } else {
      yield put(registerFailure('An unexpected error occurred.'));
    }
  }
}

function* checkUserExistsSaga(
  action: ReturnType<typeof checkUserExists>
): Generator {
  const { email, phone } = action.payload.user;
  try {
    const exists = yield call(checkDocUserExists, email, phone);
    if (exists) {
      yield put(checkUserExistsFailure(USER_ALREDY_EXIST));
    } else {
      yield put(checkUserExistsSuccess(action.payload.user));
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      yield put(checkUserExistsFailure(error.message));
    }
  }
}

function* googleLogupSaga(): Generator {
  try {
    const result = yield call(signInWithPopup, auth, provider);
    const user = result.user;
    const exists = yield call(checkDocUserExists, user.email);
    if (!exists) {
      const userData = createUserData(user.uid, {
        name: user.displayName,
        email: user.email,
        dateBirth: '',
        phone: '',
      });
      yield call(addUserToDatabase, user.uid, userData);
      yield put(getUserData(user.uid));
    } else {
      yield put(getUserData(user.uid));
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error);
    }
  }
}

export function* watchSignIn() {
  yield takeEvery(LOGIN_REQUEST, signInSaga);
}

export function* watchSignOut() {
  yield takeEvery(LOGOUT_REQUEST, logOutSaga);
}

export function* watchGoogleLogup() {
  yield takeLatest(GOOGLE_LOGUP_REQUEST, googleLogupSaga);
}

export function* watchRegister() {
  yield takeEvery(REGISTER_REQUEST, registerSaga);
}

export function* watchUserExists() {
  yield takeLatest(CHECK_USER_EXISTS, checkUserExistsSaga);
}
