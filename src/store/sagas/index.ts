import { all } from 'redux-saga/effects';

import watchToggleTheme from './themeSaga';

export default function* rootSaga() {
  yield all([watchToggleTheme()]);
}
