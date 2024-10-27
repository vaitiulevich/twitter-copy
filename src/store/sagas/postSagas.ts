import { images } from '@constants/images';
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
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { eventChannel } from 'redux-saga';
import {
  call,
  cancelled,
  put,
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
  const userId = action.payload.id;
  let channel;
  try {
    if (!action.payload.query) {
      return;
    }
    const postsQuery = action.payload.query();
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
