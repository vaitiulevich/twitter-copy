import { POSTS_PER_PAGE } from '@constants/constants';
import { PostState } from '@store/reducers/postReducer';
import { UserSearch } from '@store/reducers/searchReducer';
import { RootState } from '@store/types';
import {
  ADD_POST_REQUEST,
  DELETE_POST_REQUEST,
  FETCH_POSTS_REQUEST,
  GET_POST_REQUEST,
  GET_TOTAL_POSTS,
  UPDATE_POST_LIKES_REQUEST,
} from '@store/types/posts/actionTypes';
import {
  createPostsChannel,
  createUsersChannel,
  getUserPostCount,
  uploadImages,
} from '@store/utils/postsUtils';
import { fetchUserData } from '@store/utils/userUtils';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import {
  call,
  cancelled,
  put,
  select,
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
  getTotalUsersPosts,
  setIsMorePosts,
  setLastVisible,
  setTotalPosts,
  updatePostLikesFailure,
  updatePostLikesRequest,
  updatePostLikesSuccess,
} from '../actions/postActions';

function* fetchPosts(action: ReturnType<typeof fetchPostsRequest>): Generator {
  let channel;
  let usersChannel;
  const { posts, lastVisible } = yield select(
    (state: RootState) => state.posts
  );
  let postsQuery;
  try {
    if (!action.payload.query || !action.payload.firstQuery) {
      return;
    }
    if (!lastVisible) {
      postsQuery = action.payload.query();
    } else {
      const firstQuery = action.payload.firstQuery();
      postsQuery = firstQuery(lastVisible, action.payload.id);
    }

    const querySnapshot = yield getDocs(postsQuery);
    const isEndOfPosts = querySnapshot.docs.length >= POSTS_PER_PAGE;
    const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    yield put(setIsMorePosts(isEndOfPosts));
    yield put(setLastVisible(newLastVisible));

    channel = yield call(createPostsChannel, postsQuery);

    while (true) {
      let updatedUsers;
      let updatedPosts;
      let updatedOldPosts = [];
      updatedOldPosts = yield take(channel);

      let userIds = updatedOldPosts.map((post: PostState) => post.userId);
      usersChannel = yield call(createUsersChannel, userIds);

      if (userIds.length) {
        const usersQuery = query(
          collection(db, 'users'),
          where('userId', 'in', userIds)
        );
        const resUser = yield getDocs(usersQuery);
        const resUserusers = resUser.docs.map((doc: DocumentSnapshot) => ({
          id: doc.id,
          ...doc.data(),
        }));

        updatedUsers = resUserusers;
      }
      updatedPosts = updatedOldPosts;
      if (updatedPosts && updatedUsers) {
        const updatedPostsWithUsers = updatedPosts.map((post: PostState) => {
          const user = updatedUsers.find(
            (user: UserSearch) => user.id === post.userId
          );
          return {
            ...post,
            userAvatar: user ? user.avatar : null,
            userName: user ? user.name : null,
            userSlug: user ? user.userSlug : null,
          };
        });
        if (posts.length > 0 && lastVisible) {
          yield put(fetchPostsSuccess([...posts, ...updatedPostsWithUsers]));
        } else {
          yield put(fetchPostsSuccess(updatedPostsWithUsers));
        }
      } else {
        const isEmptyPosts = posts.length < 1 && updatedPosts.length < 1;
        if (isEmptyPosts || posts.length <= 10) {
          yield put(fetchPostsSuccess([]));
        }
      }
    }
  } catch (error) {
    yield put(fetchPostsFailure('Error fetching posts'));
  } finally {
    if (yield cancelled()) {
      if (channel) channel.close();
      if (usersChannel) usersChannel.close();
    }
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

function* getTotalUsersPostsSaga(
  action: ReturnType<typeof getTotalUsersPosts>
): Generator {
  const { id } = action.payload;
  try {
    const postsCount = yield call(getUserPostCount, id);
    yield put(setTotalPosts(postsCount));
  } catch (error) {
    yield put(getPostFailure('Error fetching posts'));
  }
}

export function* watchGetTotalUsersPosts() {
  yield takeEvery(GET_TOTAL_POSTS, getTotalUsersPostsSaga);
}
export function* watchGetPost() {
  yield takeEvery(GET_POST_REQUEST, getPost);
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
