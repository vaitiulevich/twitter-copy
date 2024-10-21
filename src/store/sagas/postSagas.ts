import { fetchPostsSuccess } from '@store/actions/userActions';
import { PostState } from '@store/reducers/userReducer';
import {
  ADD_POST_REQUEST,
  DELETE_POST_REQUEST,
  FETCH_POSTS_REQUEST,
  UPDATE_POST_LIKES_REQUEST,
} from '@store/types/posts/actionTypes';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  orderBy,
  Query,
  query,
  QuerySnapshot,
  updateDoc,
  where,
} from 'firebase/firestore';
import { eventChannel } from 'redux-saga';
import {
  call,
  cancelled,
  put,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import { db } from '../../firebase';
import {
  addPostFailure,
  addPostRequest,
  addPostSuccess,
  deletePostRequest,
  fetchPostsFailure,
  fetchPostsRequest,
  updatePostLikesFailure,
  updatePostLikesRequest,
  updatePostLikesSuccess,
} from '../actions/postActions';

function* addPost(action: ReturnType<typeof addPostRequest>) {
  try {
    const postsCollectionRef = collection(db, 'posts');
    const newPost: PostState = yield call(
      addDoc,
      postsCollectionRef,
      action.payload
    );

    yield put(addPostSuccess(newPost));
  } catch (error) {
    console.log(error);
    yield put(addPostFailure());
  }
}

function* updatePostLikes(action: ReturnType<typeof updatePostLikesRequest>) {
  const { postId, likes } = action.payload;
  try {
    const postRef = doc(db, 'posts', postId);
    yield updateDoc(postRef, { likes });

    yield put(updatePostLikesSuccess());
  } catch (error) {
    console.log(error);
    yield put(updatePostLikesFailure());
  }
}

function* deletePostSaga(action: ReturnType<typeof deletePostRequest>) {
  const { id, ownerId, userId } = action.payload;

  if (ownerId !== userId) {
    return;
  }
  try {
    const postRef = doc(db, 'posts', id);
    yield call(deleteDoc, postRef);
  } catch (error) {
    console.log(error);
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

function* fetchPosts(action: ReturnType<typeof fetchPostsRequest>): Generator {
  const userId = action.payload;
  let channel;
  try {
    const postsQuery = query(
      collection(db, 'posts'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );
    yield getDocs(postsQuery);

    channel = yield call(createPostsChannel, postsQuery);
    while (true) {
      const updatedPosts = yield take(channel);
      yield put(fetchPostsSuccess(updatedPosts));
    }
  } catch (error) {
    yield put(fetchPostsFailure());
    console.error(error);
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

export function* watchFetchPosts() {
  yield takeEvery(FETCH_POSTS_REQUEST, fetchPosts);
}

export function* watchUpdatePostLikes() {
  yield takeEvery(UPDATE_POST_LIKES_REQUEST, updatePostLikes);
}

export function* watchAddPost() {
  yield takeEvery(ADD_POST_REQUEST, addPost);
}

export function* watchDeletePost() {
  yield takeLatest(DELETE_POST_REQUEST, deletePostSaga);
}
