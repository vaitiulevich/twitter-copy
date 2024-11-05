import { PostState } from '@store/reducers/postReducer';
import {
  ADD_POST_REQUEST,
  DELETE_POST_REQUEST,
  FETCH_POSTS_REQUEST,
  GET_POST_REQUEST,
  UPDATE_POST_LIKES_REQUEST,
} from '@store/types/posts/actionTypes';
import {
  createPostsChannel,
  createUsersChannel,
  enrichPostsWithUserData,
  monitorUserChannel,
  uploadImages,
} from '@store/utils/postsUtils';
import { fetchUserData } from '@store/utils/userUtils';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import {
  call,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import { db, storage } from '../../firebase';
import {
  addPostFailure,
  addPostRequest,
  addPostSuccess,
  deletePostFailure,
  deletePostRequest,
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess,
  getPostFailure,
  getPostRequest,
  getPostSuccess,
  updatePostLikesFailure,
  updatePostLikesRequest,
  updatePostLikesSuccess,
} from '../actions/postActions';

function* fetchPosts(action: ReturnType<typeof fetchPostsRequest>): Generator {
  const postsQuery = action.payload.query();
  let channel;
  let usersChannel;

  try {
    channel = yield call(createPostsChannel, postsQuery);

    while (true) {
      const posts = yield take(channel);
      const enrichedPosts = yield call(enrichPostsWithUserData, posts);
      const userIds: Set<string> = new Set(
        enrichedPosts.map((post: PostState) => post.userId)
      );
      const userIdsArray: string[] = Array.from(userIds);
      usersChannel = yield call(createUsersChannel, userIdsArray);
      yield put(fetchPostsSuccess(enrichedPosts));
      yield fork(monitorUserChannel, usersChannel, enrichedPosts);
    }
  } catch (error) {
    yield put(fetchPostsFailure('Error with fetching posts'));
  } finally {
    if (channel) {
      channel.close();
    }
    if (usersChannel) usersChannel.close();
  }
}

function* getPost(action: ReturnType<typeof getPostRequest>): Generator {
  try {
    const id = action.payload;
    const postDocRef = doc(db, 'posts', id);
    const postDoc = yield call(getDoc, postDocRef);
    const postData = postDoc.data();

    const userData = yield call(fetchUserData, postData.userId);
    const updatePostData = {
      ...postData,
      userAvatar: userData ? userData.avatar : null,
      userName: userData ? userData.name : null,
      userSlug: userData ? userData.userSlug : null,
    };
    if (postDoc.exists()) {
      yield put(getPostSuccess(updatePostData));
    } else {
      yield put(getPostFailure('Error receiving post'));
    }
  } catch (err) {
    yield put(getPostFailure('Error receiving post'));
  }
}
function* updatePostLikes(action: ReturnType<typeof updatePostLikesRequest>) {
  const { postId, likes } = action.payload;
  try {
    const postRef = doc(db, 'posts', postId);
    yield updateDoc(postRef, { likes });
    yield put(updatePostLikesSuccess());
  } catch (error) {
    yield put(updatePostLikesFailure('Like error'));
  }
}
function* addPost(action: ReturnType<typeof addPostRequest>): Generator {
  try {
    const { files, ...postFields } = action.payload.postData;
    let postData = { ...postFields };

    if (files && files.length > 0) {
      const imageUrls = yield call(uploadImages, files);
      postData = { ...postFields, images: imageUrls };
    }

    const postsCollectionRef = collection(db, 'posts');
    const newPost: PostState = yield call(addDoc, postsCollectionRef, postData);

    yield put(addPostSuccess(newPost));
  } catch (error) {
    yield put(addPostFailure('Error creating post'));
  }
  if (action.payload.onClose) {
    yield action.payload.onClose();
  }
}

function* deletePostSaga(action: ReturnType<typeof deletePostRequest>) {
  const { id, ownerId, userId, images } = action.payload;

  if (ownerId !== userId) {
    yield put(deletePostFailure('Error deleting post'));
    return;
  }
  try {
    const postRef = doc(db, 'posts', id);
    if (images) {
      for (const imageUrl of images) {
        const imageRef = ref(storage, imageUrl);
        yield call(deleteObject, imageRef);
      }
    }
    yield call(deleteDoc, postRef);
  } catch (error) {
    yield put(deletePostFailure('Error deleting post'));
  }
}

export function* watchGetPost() {
  yield takeEvery(GET_POST_REQUEST, getPost);
}

export function* watchFetchPosts() {
  yield takeLatest(FETCH_POSTS_REQUEST, fetchPosts);
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
