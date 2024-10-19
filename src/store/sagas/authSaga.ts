import {
  claerTokens,
  loginFailure,
  loginSuccess,
  logoutSuccess,
  navigateToSetPassword,
  registerFailure,
  setTokens,
  setUserData,
} from '@store/actions/authActions';
import { UserState } from '@store/reducers/userReducer';
import {
  CHECK_USER_EXISTS,
  GOOGLE_LOGIN_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  REGISTER_REQUEST,
} from '@store/types/auth/actionTypes';
import {
  CheckUserAction,
  googleLoginRequest,
  LogOutAction,
  RegisterAction,
  SignInAction,
} from '@store/types/auth/types';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { auth, db, provider } from '../../firebase';

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
    if (err instanceof FirebaseError) {
      yield put(
        loginFailure(
          'Incorrect login/password entry or such user does not exist'
        )
      );
    }
  }
}

function* logOutSaga(action?: LogOutAction): Generator {
  try {
    yield call(signOut, auth);
    yield put(logoutSuccess());
    yield put(claerTokens());
  } catch (error) {
    // yield put(logoutFailure(error.message));
  }
}

function* addUserToDatabase(uid: string, userData: UserState): Generator {
  const userRef = doc(db, 'users', uid);
  yield setDoc(userRef, userData);
}

function* registerSaga(action: RegisterAction): Generator {
  const { email, phone, password, name, dateBirth } = action.payload;
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
    const userData = {
      userId: userCredential.user.uid,
      userSlug: `@${name}_${userCredential.user.uid.slice(-4)}`,
      email,
      phone,
      password,
      name,
      dateBirth,
      avatar: null,
      profileImg: null,
      followers: [],
      following: [],
      posts: [],
    };
    yield call(addUserToDatabase, userCredential.user.uid, userData);
    const userRef = doc(db, 'users', userCredential.user.uid);
    yield setDoc(userRef, userData);

    yield put(loginSuccess(email, userCredential.user.uid));
    yield put(setTokens(accessToken, refreshToken));
  } catch (err) {
    if (err instanceof FirebaseError) {
      yield put(registerFailure(err.message));
    } else {
      yield put(registerFailure('An unexpected error occurred.'));
    }
  }
}

async function checkUserExists(
  email?: string,
  phone?: string
): Promise<boolean | null> {
  const usersRef = collection(db, 'users');
  const emailQuery = email
    ? query(usersRef, where('email', '==', email))
    : null;
  const phoneQuery = phone
    ? query(usersRef, where('phone', '==', phone))
    : null;

  const emailExists = emailQuery ? await getDocs(emailQuery) : null;
  const phoneExists = phoneQuery ? await getDocs(phoneQuery) : null;
  return (
    !!(emailExists && !emailExists.empty) ||
    !!(phoneExists && !phoneExists.empty)
  );
}

function* checkUserExistsSaga(action: CheckUserAction): Generator {
  const { email, phone } = action.payload.user;
  try {
    const exists = yield call(checkUserExists, email, phone);
    if (exists) {
      yield put(registerFailure('User alredy exist'));
      return exists;
    } else {
      yield put(setUserData(action.payload.user));

      yield put(navigateToSetPassword());
      return exists;
    }
  } catch (error) {
    // yield put(checkUserExistsFailure(error.message));
  }
}

function* googleLoginSaga(action: googleLoginRequest): Generator {
  try {
    const result = yield call(signInWithPopup, auth, provider);
    const user = result.user;
    const exists = yield call(checkUserExists, user.email);

    const userData = {
      userId: user.uid,
      userSlug: `@${user.displayName}_${user.uid.slice(-4)}`,
      email: user.email,
      phone: '',
      password: user.providerData[0].uid,
      name: user.displayName,
      dateBirth: '',
      avatar: null,
      profileImg: null,
      followers: [],
      following: [],
      posts: [],
    };

    const accessToken = yield user.getIdToken();
    const refreshToken = user.refreshToken;
    if (!exists) {
      const userRef = doc(db, 'users', user.uid);
      yield setDoc(userRef, userData);
      yield put(setTokens(accessToken, refreshToken));
    }

    yield put(loginSuccess(user.email, user.uid));
  } catch (error) {
    console.log(error);
  }
}

export function* watchGoogleLogin() {
  yield takeLatest(GOOGLE_LOGIN_REQUEST, googleLoginSaga);
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
  yield takeLatest(CHECK_USER_EXISTS, checkUserExistsSaga);
}
