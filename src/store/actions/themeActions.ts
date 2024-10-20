import {
  TOGGLE_THEME_REQUEST,
  TOGGLE_THEME_SUCCESS,
} from '@store/types/theme/actionTypes';

export const toggleThemeRequest = () => ({
  type: TOGGLE_THEME_REQUEST,
});

export const toggleThemeSuccess = () => ({
  type: TOGGLE_THEME_SUCCESS,
});
