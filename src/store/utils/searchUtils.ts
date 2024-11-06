import { PostState } from '@store/reducers/postReducer';
import { UserSearch } from '@store/reducers/searchReducer';
import {
  postSearchQuery,
  usersByIdsQuery,
  userSearchQuery,
} from '@utils/querys';
import { DocumentSnapshot, getDocs } from 'firebase/firestore';
import { call } from 'redux-saga/effects';

export function* searchPosts(searchTerm: string): Generator {
  const postsQuery = postSearchQuery(searchTerm);
  const querySnapshot = yield call(getDocs, postsQuery);
  const postsResults = querySnapshot.docs.map((doc: DocumentSnapshot) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (!postsResults.length) {
    return postsResults;
  }

  const userIds = postsResults.map((post: PostState) => post.userId);
  const usersSnapshot = yield call(getDocs, usersByIdsQuery(userIds));
  const users = usersSnapshot.docs.map((doc: DocumentSnapshot) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const usersMap = users.reduce(
    (acc: Record<string, UserSearch>, user: UserSearch) => {
      acc[user.id] = user;
      return acc;
    },
    {}
  );

  return postsResults.map((post: PostState) => ({
    ...post,
    userAvatar: usersMap[post.userId]?.avatar || null,
    userName: usersMap[post.userId]?.name || null,
    userSlug: usersMap[post.userId]?.userSlug || null,
  }));
}

export function* searchUsers(searchTerm: string): Generator {
  const usersQuery = userSearchQuery(searchTerm);
  const queryUserSnapshot = yield call(getDocs, usersQuery);
  return queryUserSnapshot.docs.map((doc: DocumentSnapshot) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
