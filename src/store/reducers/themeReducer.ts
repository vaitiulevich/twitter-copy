import { ThemeAction,ThemeState } from '@store/types';

const initialState: ThemeState = {
  theme: 'light',
};

const themeReducer = (
  state = initialState,
  action: ThemeAction
): ThemeState => {
  switch (action.type) {
    case 'TOGGLE_THEME_SUCCESS':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    default:
      return state;
  }
};

export default themeReducer;
