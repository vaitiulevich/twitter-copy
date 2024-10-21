import {
  watchGoogleLogin,
  watchRegister,
  watchSignIn,
  watchSignOut,
  watchUserExists,
} from '@store/sagas/authSaga';
import {
  watchAddPost,
  watchDeletePost,
  watchFetchPosts,
  watchUpdatePostLikes,
} from '@store/sagas/postSagas';
import watchToggleTheme from '@store/sagas/themeSaga';
import { watchAuth, watchUserData } from '@store/sagas/userSaga';
import { all } from 'redux-saga/effects';

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
  ]);
}
