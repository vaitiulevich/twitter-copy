import * as actions from '@store/actions/searchActions';
import { InferValueTypes } from '@store/types';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

export type SearchAction = ReturnType<InferValueTypes<typeof actions>>;
