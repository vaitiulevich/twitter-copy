import * as actions from '@store/actions/popUpActions';
import { InferValueTypes } from '@store/types';

export const SHOW_ERROR_POPUP = 'SHOW_ERROR_POPUP';
export const HIDE_ERROR_POPUP = 'HIDE_ERROR_POPUP';

export type PopUpAction = ReturnType<InferValueTypes<typeof actions>>;
