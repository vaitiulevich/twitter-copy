import { userAllPostsQuery, usersByIdsQuery } from '@utils/querys';
import {
  DocumentData,
  getDocs,
  onSnapshot,
  Query,
  QuerySnapshot,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { eventChannel } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';

import { storage } from '../../firebase';

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
