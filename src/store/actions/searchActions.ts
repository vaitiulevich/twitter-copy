import { SearchState } from '@store/reducers/searchReducer';
import * as actions from '@store/types/search/actionTypes';

export const searchRequest = (term: string) =>
  ({
    type: actions.SEARCH_REQUEST,
    payload: term,
  }) as const;

export const searchSuccess = (results: SearchState) =>
  ({
    type: actions.SEARCH_SUCCESS,
    payload: results,
  }) as const;

export const searchFailure = (error: string) =>
  ({
    type: actions.SEARCH_FAILURE,
    payload: error,
  }) as const;
