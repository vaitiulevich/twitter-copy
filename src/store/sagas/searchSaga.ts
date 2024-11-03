import { showErrorPopUp } from '@store/actions/popUpActions';
import { searchRequest, searchSuccess } from '@store/actions/searchActions';
import { PostState } from '@store/reducers/postReducer';
import { UserSearch } from '@store/reducers/searchReducer';
import { SEARCH_REQUEST } from '@store/types/search/actionTypes';
import {
  postSearchQuery,
  usersByIdsQuery,
  userSearchQuery,
} from '@utils/querys';
import { FirebaseError } from 'firebase/app';
import { DocumentSnapshot, getDocs } from 'firebase/firestore';
import { call, put, takeLatest } from 'redux-saga/effects';

function* searchTwetter(action: ReturnType<typeof searchRequest>): Generator {
  if (action.payload === '') {
    yield put(searchSuccess({ posts: [], users: [] }));
    return;
  }
  try {
    const searchTerm = action.payload;

    const postsQuery = postSearchQuery(searchTerm);
    const querySnapshot = yield call(getDocs, postsQuery);
    const postsResults = querySnapshot.docs.map((doc: DocumentSnapshot) => ({
      id: doc.id,
      ...doc.data(),
    }));
    let postsWithUserNames = postsResults;
    if (postsResults.length) {
      let userIds = postsResults.map((post: PostState) => post.userId);
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
      postsWithUserNames = postsResults.map((post: PostState) => ({
        ...post,
        userAvatar: usersMap[post.userId]?.avatar || null,
        userName: usersMap[post.userId]?.name || null,
        userSlug: usersMap[post.userId]?.userSlug || null,
      }));
    }

    const usersQuery = userSearchQuery(searchTerm);
    const queryUserSnapshot = yield call(getDocs, usersQuery);
    const usersResults = queryUserSnapshot.docs.map(
      (doc: DocumentSnapshot) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

    const isHasResults =
      postsWithUserNames.length > 0 || usersResults.length > 0;

    if (isHasResults) {
      yield put(
        searchSuccess({ posts: postsWithUserNames, users: usersResults })
      );
    } else {
      yield put(searchSuccess({ posts: null, users: null }));
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      yield put(showErrorPopUp(error.message));
    }
  }
}

export function* watchSearch() {
  yield takeLatest(SEARCH_REQUEST, searchTwetter);
}
