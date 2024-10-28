import authReducer from '@store/reducers/authRedicer';
import postReducer from '@store/reducers/postReducer';
import themeReducer from '@store/reducers/themeReducer';
import userReducer from '@store/reducers/userReducer';
import { combineReducers } from 'redux';

import otherUserReducer from './otherUserReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  user: userReducer,
  posts: postReducer,
  otherUser: otherUserReducer,
});
export default rootReducer;
