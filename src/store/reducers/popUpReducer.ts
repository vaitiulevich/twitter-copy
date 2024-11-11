import {
  HIDE_ERROR_POPUP,
  PopUpAction,
  SHOW_ERROR_POPUP,
} from '@store/types/popUp/actionTypes';
export interface PopUpState {
  message: string | null;
}
const initialState: PopUpState = {
  message: null,
};

const popUpReducer = (state = initialState, action: PopUpAction) => {
  switch (action.type) {
    case SHOW_ERROR_POPUP:
      return {
        ...state,
        message: action.payload,
      };
    case HIDE_ERROR_POPUP:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};

export default popUpReducer;
