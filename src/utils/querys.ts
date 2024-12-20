import { PostState } from '@store/reducers/postReducer';
import {
  collection,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';

import { db } from '../firebase';
const postsRef = collection(db, 'posts');
export const userPostsQuery = (userId: string) => {
  return query(
    postsRef,
    where('userId', '==', userId),
    orderBy('timestamp', 'desc')
  );
};
export const userAllPostsQuery = (userId: string) => {
  return query(
    postsRef,
    where('userId', '==', userId),
    orderBy('timestamp', 'desc')
  );
};

export const userCursorPostsQuery = (
  lastVisible: PostState,
  userId: string
) => {
  return query(
    postsRef,
    where('userId', '==', userId),
    orderBy('timestamp', 'desc'),
    startAfter(lastVisible)
  );
};

export const allPostsQuery = () => {
  return query(postsRef, orderBy('timestamp', 'desc'));
};

export const allCursorPostsQuery = (lastVisible: PostState) => {
  return query(postsRef, orderBy('timestamp', 'desc'), startAfter(lastVisible));
};

export const postSearchQuery = (searchTerm: string) => {
  return query(
    postsRef,
    where('content', 'array-contains', searchTerm),
    orderBy('timestamp', 'desc')
  );
};

export const userSearchQuery = (searchTerm: string) => {
  return query(
    collection(db, 'users'),
    where('name', '>=', searchTerm),
    where('name', '<=', searchTerm + '\uf8ff')
  );
};

export const usersByIdsQuery = (visibleUserIds: string[]) => {
  return query(collection(db, 'users'), where('userId', 'in', visibleUserIds));
};
