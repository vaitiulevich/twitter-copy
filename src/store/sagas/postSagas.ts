import { POSTS_PER_PAGE } from '@constants/constants';
import { PostState } from '@store/reducers/postReducer';
import { UserSearch } from '@store/reducers/searchReducer';
import { RootState, User } from '@store/types';
import {
  ADD_POST_REQUEST,
  DELETE_POST_REQUEST,
  FETCH_POSTS_REQUEST,
  UPDATE_POST_LIKES_REQUEST,
} from '@store/types/posts/actionTypes';
import { userAllPostsQuery } from '@utils/querys';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  Query,
  query,
  QuerySnapshot,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { eventChannel } from 'redux-saga';
import {
  all,
  call,
  cancelled,
  put,
  race,
  select,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';

import { db, storage } from '../../firebase';
import {
  addPostFailure,
  addPostRequest,
  addPostSuccess,
  deletePostRequest,
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess,
  setIsMorePosts,
  setLastVisible,
  setTotalPosts,
  updatePostLikesFailure,
  updatePostLikesRequest,
  updatePostLikesSuccess,
} from '../actions/postActions';

export function* uploadImages(files: File[]): Generator {
  const urls: string[] = [];

  for (const file of files) {
    const uniqueName = `${uuidv4()}_${file.name}`;
    const storageRef = ref(storage, `images/${uniqueName}`);
    yield call(uploadBytes, storageRef, file);
    const downloadURL = yield call(getDownloadURL, storageRef);
    urls.push(downloadURL);
  }

  return urls;
}

export function* getUserPostCount(userId: string): Generator {
  const postsQuery = userAllPostsQuery(userId);
  const querySnapshot = yield getDocs(postsQuery);
  return querySnapshot.size;
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
    console.log(error);
    yield put(addPostFailure());
  }
  if (action.payload.onClose) {
    yield action.payload.onClose();
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
  const { id, ownerId, userId, images } = action.payload;

  if (ownerId !== userId) {
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
    console.log(error);
  }
}

function createPostsChannel(postsQuery: Query<DocumentData>) {
  return eventChannel((emitter: (data: DocumentData[]) => void) => {
    const unsubscribe = onSnapshot(
      postsQuery,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const updatedPosts: any = snapshot.docs.map((doc) => ({
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

const createUsersChannel = (visibleUserIds: string[]) => {
  if (!visibleUserIds || visibleUserIds.length === 0) {
    return eventChannel((emitter) => {
      emitter([]);
      return () => {};
    });
  }

  return eventChannel((emitter) => {
    const usersQuery = query(
      collection(db, 'users'),
      where('userId', 'in', visibleUserIds)
    );

    const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
      const updatedUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      emitter(updatedUsers);
    });

    return () => {
      unsubscribe();
    };
  });
};

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
        const resUserusers = resUser.docs.map((doc: any) => ({
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
    yield put(fetchPostsFailure());
    console.error(error);
  } finally {
    if (yield cancelled()) {
      if (channel) channel.close();
      if (usersChannel) usersChannel.close();
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
