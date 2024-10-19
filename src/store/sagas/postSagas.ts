import { PostState } from '@store/reducers/userReducer';
import {
  ADD_POST_REQUEST,
  UPDATE_POST_LIKES_REQUEST,
} from '@store/types/posts/actionTypes';
import {
  addPostRequest,
  updatePostLikesRequest,
} from '@store/types/posts/types';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { call, put, takeEvery } from 'redux-saga/effects';

import { db } from '../../firebase';
import {
  addPostFailure,
  addPostSuccess,
  updatePostLikesFailure,
  updatePostLikesSuccess,
} from '../actions/postActions';

function* addPost(action: addPostRequest) {
  console.log(action.payload);
  try {
    const postsCollectionRef = collection(db, 'posts');
    const newPost: PostState = yield call(
      addDoc,
      postsCollectionRef,
      action.payload
    );

    yield put(addPostSuccess(newPost));
  } catch (error) {
    yield put(addPostFailure());
  }
}

function* updatePostLikes(action: updatePostLikesRequest) {
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

export function* watchUpdatePostLikes() {
  yield takeEvery(UPDATE_POST_LIKES_REQUEST, updatePostLikes);
}

export function* watchAddPost() {
  yield takeEvery(ADD_POST_REQUEST, addPost);
}
