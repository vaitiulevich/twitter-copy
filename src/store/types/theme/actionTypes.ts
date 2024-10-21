import * as actions from '@store/actions/themeActions';
import { InferValueTypes } from '@store/types';

export const TOGGLE_THEME_REQUEST = 'TOGGLE_THEME_REQUEST';
export const TOGGLE_THEME_SUCCESS = 'TOGGLE_THEME_SUCCESS';

export type ThemeAction = ReturnType<InferValueTypes<typeof actions>>;
