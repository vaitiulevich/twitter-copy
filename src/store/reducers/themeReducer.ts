import {
  ThemeAction,
  TOGGLE_THEME_SUCCESS,
} from '@store/types/theme/actionTypes';
type Theme = 'light' | 'dark';

export interface ThemeState {
  theme: Theme;
}
const initialState: ThemeState = {
  theme: 'light',
};

const themeReducer = (
  state = initialState,
  action: ThemeAction
): ThemeState => {
  switch (action.type) {
    case TOGGLE_THEME_SUCCESS:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    default:
      return state;
  }
};

export default themeReducer;
