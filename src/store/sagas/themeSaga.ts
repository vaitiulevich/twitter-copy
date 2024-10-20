import { toggleThemeSuccess } from '@store/actions/themeActions';
import { TOGGLE_THEME_REQUEST } from '@store/types/theme/actionTypes';
import { put, takeEvery } from 'redux-saga/effects';

function* toggleThemeSaga() {
  yield put(toggleThemeSuccess());
}

function* watchToggleTheme() {
  yield takeEvery(TOGGLE_THEME_REQUEST, toggleThemeSaga);
}

export default watchToggleTheme;
