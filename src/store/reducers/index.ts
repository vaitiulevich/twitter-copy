import authReducer from '@store/reducers/authRedicer';
import otherUserReducer from '@store/reducers/otherUserReducer';
import popUpReducer from '@store/reducers/popUpReducer';
import postReducer from '@store/reducers/postReducer';
import searchReducer from '@store/reducers/searchReducer';
import themeReducer from '@store/reducers/themeReducer';
import userReducer from '@store/reducers/userReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  user: userReducer,
  posts: postReducer,
  otherUser: otherUserReducer,
  search: searchReducer,
  popup: popUpReducer,
});

export default rootReducer;
