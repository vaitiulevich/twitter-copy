import { showErrorPopUp } from '@store/actions/popUpActions';
import { searchRequest, searchSuccess } from '@store/actions/searchActions';
import { PostState } from '@store/reducers/postReducer';
import { UserSearch } from '@store/reducers/searchReducer';
import { SEARCH_REQUEST } from '@store/types/search/actionTypes';
import { searchPosts, searchUsers } from '@store/utils/searchUtils';
import {
  postSearchQuery,
  usersByIdsQuery,
  userSearchQuery,
} from '@utils/querys';
import { FirebaseError } from 'firebase/app';
import { DocumentSnapshot, getDocs } from 'firebase/firestore';
import { call, put, takeLatest } from 'redux-saga/effects';

function* searchTwitter(action: ReturnType<typeof searchRequest>): Generator {
  if (action.payload === '') {
    yield put(searchSuccess({ posts: [], users: [] }));
    return;
  }

  try {
    const searchTerm = action.payload;

    const postsWithUserNames = yield call(searchPosts, searchTerm);
    const usersResults = yield call(searchUsers, searchTerm);

    const hasResults = postsWithUserNames.length > 0 || usersResults.length > 0;
    console.log(hasResults);

    if (hasResults) {
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
  yield takeLatest(SEARCH_REQUEST, searchTwitter);
}
