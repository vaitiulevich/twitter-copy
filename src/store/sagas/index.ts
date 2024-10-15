import { all } from 'redux-saga/effects';

import {
  watchRegister,
  watchSignIn,
  watchSignOut,
  watchUserExists,
} from './authSaga';
import watchToggleTheme from './themeSaga';

export default function* rootSaga() {
  yield all([
    watchToggleTheme(),
    watchSignIn(),
    watchSignOut(),
    watchRegister(),
    watchUserExists(),
  ]);
}
