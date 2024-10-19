import {
  CHECK_USER_EXISTS,
  claerTokens,
  LOGIN_REQUEST,
  loginSuccess,
  LOGOUT_REQUEST,
  logoutSuccess,
  REGISTER_REQUEST,
  registerFailure,
  registerSuccess,
  setTokens,
  setUserData,
} from '@store/actions/authActions';
import {
  CheckUserAction,
  LogOutAction,
  RegisterAction,
  SignInAction,
} from '@store/types';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { call, put, takeEvery } from 'redux-saga/effects';

import { auth, db } from '../../firebase';

function* signInSaga(action: SignInAction): Generator {
  try {
    const { email, password } = action.payload;
    const userCredential = yield call(
      signInWithEmailAndPassword,
      auth,
      email,
      password
    );

    const accessToken = yield userCredential.user.getIdToken();
    const refreshToken = userCredential.user.refreshToken;
    const user = userCredential.user;

    yield put(loginSuccess(user.email, user.uid));
    yield put(setTokens(accessToken, refreshToken));
  } catch (err) {
    console.log(err);
    // if (err instanceof FirebaseError) {
    //   // Обработка ошибок
    // }
  }
}

function* logOutSaga(action?: LogOutAction): Generator {
  console.log('LogOutSaga triggered', action);
  try {
    yield call(signOut, auth);
    yield put(logoutSuccess());
    yield put(claerTokens());
  } catch (error) {
    // yield put(logoutFailure(error.message));
  }
}

function* registerSaga(action: RegisterAction): Generator {
  const { email, phone, password } = action.payload;
  const auth = getAuth();

  try {
    const userCredential = yield call(
      createUserWithEmailAndPassword,
      auth,
      email,
      password
    );
    const accessToken = yield userCredential.user.getIdToken();
    const refreshToken = userCredential.user.refreshToken;
    const userRef = doc(db, 'users', userCredential.user.uid);
    const userData = { email, phone };
    setDoc(userRef, userData);
    yield put(registerSuccess(userCredential.user));
    yield put(setTokens(accessToken, refreshToken));
  } catch (err) {
    if (err instanceof FirebaseError) {
      yield put(registerFailure(err.message));
    } else {
      yield put(registerFailure('An unexpected error occurred.'));
    }
  }
}

function* checkUserExistsSaga(action: CheckUserAction): Generator {
  const { user } = action.payload;
  const auth = getAuth();
  try {
    const signInMethods = yield call(
      fetchSignInMethodsForEmail,
      auth,
      user.email
    );
    if (signInMethods.length > 0) {
      console.log('User is alredy exist');
    } else {
      yield put(setUserData(user));
    }
  } catch (error) {
    console.error('Error checking user existence:', error);
  }
}

export function* watchSignIn() {
  yield takeEvery(LOGIN_REQUEST, signInSaga);
}

export function* watchSignOut() {
  yield takeEvery(LOGOUT_REQUEST, logOutSaga);
}

export function* watchRegister() {
  yield takeEvery(REGISTER_REQUEST, registerSaga);
}

export function* watchUserExists() {
  yield takeEvery(CHECK_USER_EXISTS, checkUserExistsSaga);
}
