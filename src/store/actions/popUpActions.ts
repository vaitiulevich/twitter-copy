import * as actions from '@store/types/popUp/actionTypes';

export const showErrorPopUp = (message: string) =>
  ({
    type: actions.SHOW_ERROR_POPUP,
    payload: message,
  }) as const;

export const hideErrorPopUp = () =>
  ({
    type: actions.HIDE_ERROR_POPUP,
  }) as const;
