// import { Reducer } from 'react';
import authReducer from '@store/reducers/authRedicer';
import otherUserReducer from '@store/reducers/otherUserReducer';
import popUpReducer from '@store/reducers/popUpReducer';
import postReducer from '@store/reducers/postReducer';
import searchReducer from '@store/reducers/searchReducer';
import themeReducer from '@store/reducers/themeReducer';
import userReducer from '@store/reducers/userReducer';
import { RootAction, RootState } from '@store/types';
import { combineReducers, Reducer } from 'redux';

const rootReducer: Reducer<RootState, RootAction> = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  user: userReducer,
  posts: postReducer,
  otherUser: otherUserReducer,
  search: searchReducer,
  popup: popUpReducer,
});

export default rootReducer;
