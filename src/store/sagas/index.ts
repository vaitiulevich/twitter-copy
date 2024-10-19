import { all } from 'redux-saga/effects';

import {
  watchGoogleLogin,
  watchRegister,
  watchSignIn,
  watchSignOut,
  watchUserExists,
} from './authSaga';
import { watchAddPost, watchUpdatePostLikes } from './postSagas';
import watchToggleTheme from './themeSaga';
import { watchFetchPosts, watchUserData } from './userSaga';

export default function* rootSaga() {
  yield all([
    watchToggleTheme(),
    watchSignIn(),
    watchSignOut(),
    watchRegister(),
    watchUserExists(),
    watchUserData(),
    watchFetchPosts(),
    watchAddPost(),
    watchUpdatePostLikes(),
    watchGoogleLogin(),
  ]);
}
