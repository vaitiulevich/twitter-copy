import { collection, orderBy, query, where } from 'firebase/firestore';

import { db } from '../firebase';

export const userPostsQuery = (userId: string) => {
  return query(
    collection(db, 'posts'),
    where('userId', '==', userId),
    orderBy('timestamp', 'desc')
  );
};

export const allPostsQuery = () => {
  return query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
};
