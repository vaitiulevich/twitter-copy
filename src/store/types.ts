export type Theme = 'light' | 'dark';

export interface ThemeState {
  theme: Theme;
}

export interface ToggleThemeAction {
  type: 'TOGGLE_THEME_REQUEST';
}

export interface ToggleThemeSuccessAction {
  type: 'TOGGLE_THEME_SUCCESS';
}

export type ThemeAction = ToggleThemeAction | ToggleThemeSuccessAction;

export interface RootState {
  theme: ThemeState;
}
