import {
  watchGoogleLogin,
  watchGoogleLogup,
  watchRegister,
  watchSignIn,
  watchSignOut,
  watchUserExists,
} from '@store/sagas/authSaga';
import {
  watchFetchOtherUserData,
  watchSetFollowingStatus,
} from '@store/sagas/otherUserSaga';
import {
  watchAddPost,
  watchDeletePost,
  watchFetchPosts,
  watchUpdatePostLikes,
} from '@store/sagas/postSagas';
import watchToggleTheme from '@store/sagas/themeSaga';
import {
  watchAuth,
  watchChangePassword,
  watchUpdateUserData,
  watchUserData,
} from '@store/sagas/userSaga';
import { all } from 'redux-saga/effects';

import { watchSearch } from './searchSaga';

export default function* rootSaga() {
  yield all([
    watchToggleTheme(),
    watchSignIn(),
    watchGoogleLogin(),
    watchSignOut(),
    watchUserExists(),
    watchRegister(),
    watchAuth(),
    watchUserData(),
    watchFetchPosts(),
    watchAddPost(),
    watchDeletePost(),
    watchUpdatePostLikes(),
    watchUpdateUserData(),
    watchGoogleLogup(),
    watchChangePassword(),
    watchFetchOtherUserData(),
    watchSetFollowingStatus(),
    watchSearch(),
  ]);
}
