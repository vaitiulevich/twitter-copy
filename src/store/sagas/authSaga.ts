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
import { User } from '@store/types';
import {
  CHECK_USER_EXISTS,
  GOOGLE_LOGIN_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  REGISTER_REQUEST,
} from '@store/types/auth/actionTypes';
import { generateSlug } from '@utils/generateSlug';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
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

interface UserDataProps extends User {
  userId: string;
  userSlug: string;
  followers: string[];
  following: string[];
  posts: string[];
}
function* signInSaga(action: ReturnType<typeof loginRequest>): Generator {
  try {
    const { type, login, password } = action.payload;
    if (type === 'email') {
      yield call(signInWithEmailAndPassword, auth, login, password);
    }
    if (type === 'phone') {
      const user = yield getUserFromDatabase(login, password);
      // console.log(user);
      // const match = password === user.password;
      // yield auth.signInWithCustomToken(user.customToken);
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

function createUserData(uid: string, payload: User & { password?: string }) {
  const userSlug = generateSlug(payload.name, uid);
  const userData = {
    userId: uid,
    userSlug,
    ...payload,
    avatar: null,
    profileImg: null,
    followers: [],
    following: [],
    posts: [],
  };
  return userData;
}

function* addUserToDatabase(uid: string, userData: UserDataProps): Generator {
  const userRef = doc(db, 'users', uid);
  yield setDoc(userRef, userData);
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

async function checkDocUserExists(
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

function* googleLoginSaga(): Generator {
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

export function* watchGoogleLogin() {
  yield takeLatest(GOOGLE_LOGIN_REQUEST, googleLoginSaga);
}

export function* watchRegister() {
  yield takeEvery(REGISTER_REQUEST, registerSaga);
}

export function* watchUserExists() {
  yield takeLatest(CHECK_USER_EXISTS, checkUserExistsSaga);
}
function* getUserFromDatabase(phoneNumber: any, password: string): unknown {
  throw new Error('Function not implemented.');
}
