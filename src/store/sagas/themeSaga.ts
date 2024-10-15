import { put,takeEvery } from 'redux-saga/effects';

import {
  TOGGLE_THEME_REQUEST,
  toggleThemeSuccess,
} from '../actions/themeActions';

function* toggleThemeSaga() {
  yield put(toggleThemeSuccess());
}

function* watchToggleTheme() {
  yield takeEvery(TOGGLE_THEME_REQUEST, toggleThemeSaga);
}

export default watchToggleTheme;
