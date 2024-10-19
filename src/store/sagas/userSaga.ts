import {
  fetchPostsFailure,
  fetchPostsSuccess,
  getUserDataSuccess,
} from '@store/actions/userActions';
import { fetchPostsAction, getUserDataAction } from '@store/types';
import { LOGOUT_SUCCESS } from '@store/types/auth/actionTypes';
import {
  FETCH_POSTS_REQUEST,
  GET_USER_DATA,
} from '@store/types/user/actionTypes';
import { FirebaseError } from 'firebase/app';
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  Query,
  query,
  QuerySnapshot,
  where,
} from 'firebase/firestore';
import { eventChannel } from 'redux-saga';
import { call, put, take, takeEvery } from 'redux-saga/effects';

import { db } from '../../firebase';

function* getUserData(action: getUserDataAction): Generator {
  const id = action.payload;
  console.log(action.payload);
  try {
    const userDocRef = doc(db, 'users', `${id}`);
    const userDoc = yield getDoc(userDocRef);
    const userData = userDoc.data();
    delete userData.password;
    yield put(getUserDataSuccess(userData));
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error.message);
    }
  }
}
function createPostsChannel(postsQuery: Query<DocumentData>) {
  return eventChannel((emitter: (data: DocumentData[]) => void) => {
    const unsubscribe = onSnapshot(
      postsQuery,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const updatedPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        emitter(updatedPosts);
      }
    );

    return () => {
      unsubscribe();
    };
  });
}
function* fetchPosts(action: fetchPostsAction): Generator {
  const userId = action.payload;
  let channel;
  try {
    const postsQuery = query(
      collection(db, 'posts'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );
    const postsSnapshot = yield getDocs(postsQuery);
    const posts = postsSnapshot.docs.map((doc: DocumentData) => ({
      id: doc.id,
      ...doc.data(),
    }));

    yield put(fetchPostsSuccess(posts));
    channel = yield call(createPostsChannel, postsQuery);

    while (true) {
      const updatedPosts = yield take(channel);
      yield put(fetchPostsSuccess(updatedPosts));
    }
  } catch (error) {
    yield put(fetchPostsFailure());
    console.error(error);
  } finally {
    yield take([LOGOUT_SUCCESS, FETCH_POSTS_REQUEST]);
    channel.close();
  }
}

export function* watchUserData() {
  yield takeEvery(GET_USER_DATA, getUserData);
}

export function* watchFetchPosts() {
  yield takeEvery(FETCH_POSTS_REQUEST, fetchPosts);
}
