import { searchRequest, searchSuccess } from '@store/actions/searchActions';
import { SEARCH_REQUEST } from '@store/types/search/actionTypes';
import { postSearchQuery, userSearchQuery } from '@utils/querys';
import { getDocs } from 'firebase/firestore';
import { call, put, takeLatest } from 'redux-saga/effects';

function* searchPosts(action: ReturnType<typeof searchRequest>): Generator {
  if (action.payload === '') {
    yield put(searchSuccess({ posts: [], users: [] }));
    return;
  }
  try {
    const searchTerm = action.payload;

    const postsQuery = postSearchQuery(searchTerm);
    const querySnapshot = yield call(getDocs, postsQuery);
    const postsResults = querySnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const usersQuery = userSearchQuery(searchTerm);
    const queryUserSnapshot = yield call(getDocs, usersQuery);
    const usersResults = queryUserSnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    yield put(searchSuccess({ posts: postsResults, users: usersResults }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchSearch() {
  yield takeLatest(SEARCH_REQUEST, searchPosts);
}
