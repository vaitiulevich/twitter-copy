import { POSTS_PER_PAGE } from '@constants/constants';
import { PostState } from '@store/reducers/postReducer';
import {
  collection,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';

import { db } from '../firebase';
export const userPostsQuery = (userId: string) => {
  return query(
    collection(db, 'posts'),
    where('userId', '==', userId),
    orderBy('timestamp', 'desc'),
    limit(POSTS_PER_PAGE)
  );
};
export const userAllPostsQuery = (userId: string) => {
  return query(
    collection(db, 'posts'),
    where('userId', '==', userId),
    orderBy('timestamp', 'desc')
  );
};

export const userCursorPostsQuery = (
  lastVisible: PostState,
  userId: string
) => {
  return query(
    collection(db, 'posts'),
    where('userId', '==', userId),
    orderBy('timestamp', 'desc'),
    startAfter(lastVisible),
    limit(POSTS_PER_PAGE)
  );
};

export const allPostsQuery = () => {
  return query(
    collection(db, 'posts'),
    orderBy('timestamp', 'desc'),
    limit(POSTS_PER_PAGE)
  );
};

export const allCursorPostsQuery = (lastVisible: PostState) => {
  return query(
    collection(db, 'posts'),
    orderBy('timestamp', 'desc'),
    startAfter(lastVisible),
    limit(POSTS_PER_PAGE)
  );
};
