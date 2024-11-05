import { fetchPostsSuccess } from '@store/actions/postActions';
import { PostState } from '@store/reducers/postReducer';
import { UserState } from '@store/reducers/userReducer';
import { userAllPostsQuery, usersByIdsQuery } from '@utils/querys';
import {
  collection,
  DocumentData,
  DocumentSnapshot,
  getDocs,
  onSnapshot,
  Query,
  query,
  QuerySnapshot,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Channel, eventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';

import { db, storage } from '../../firebase';

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

export function createPostsChannel(postsQuery: Query<DocumentData>) {
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
export function* enrichPostsWithUserData(posts: PostState[]): Generator {
  const userIds = new Set(posts.map((post) => post.userId));
  const usersSnapshot = yield call(getDocs, query(collection(db, 'users')));
  const usersMap = new Map();

  usersSnapshot.forEach((userDoc: DocumentSnapshot) => {
    const userData = { id: userDoc.id, ...userDoc.data() };
    if (userIds.has(userData.id)) {
      usersMap.set(userData.id, userData);
    }
  });

  return posts.map((post: PostState) => ({
    ...post,
    userAvatar: usersMap.get(post.userId)?.avatar,
    userName: usersMap.get(post.userId)?.name,
    userSlug: usersMap.get(post.userId)?.userSlug,
  }));
}

export const createUsersChannel = (visibleUserIds: string[]) => {
  if (!visibleUserIds || visibleUserIds.length === 0) {
    return eventChannel((emitter) => {
      emitter([]);
      return () => {};
    });
  }

  return eventChannel((emitter) => {
    const unsubscribe = onSnapshot(
      usersByIdsQuery(visibleUserIds),
      (snapshot) => {
        const updatedUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        emitter(updatedUsers);
      }
    );

    return () => {
      unsubscribe();
    };
  });
};
interface UserChannelMessage {
  userId: string;
  userData: UserState | null;
}
export function* monitorUserChannel(
  userChannel: Channel<UserChannelMessage>,
  initialPosts: PostState[]
): Generator {
  while (true) {
    const changedUserData = yield take(userChannel);
    const updatedPostsWithNewData = initialPosts.map((post: PostState) =>
      post.userId === changedUserData[0].userId
        ? {
            ...post,
            userName: changedUserData[0].name,
            userAvatar: changedUserData[0].avatar,
            userSlug: changedUserData[0].userSlug,
          }
        : post
    );
    yield put(fetchPostsSuccess(updatedPostsWithNewData));
  }
}
