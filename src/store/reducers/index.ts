import authReducer from '@store/reducers/authRedicer';
import otherUserReducer from '@store/reducers/otherUserReducer';
import popUpReducer from '@store/reducers/popUpReducer';
import postReducer from '@store/reducers/postReducer';
import searchReducer from '@store/reducers/searchReducer';
import themeReducer from '@store/reducers/themeReducer';
import userReducer from '@store/reducers/userReducer';
// import { RootAction, RootState } from '@store/types';
import { combineReducers } from 'redux';
// interface RootState {
//   theme: ReturnType<typeof themeReducer>;
//   auth: ReturnType<typeof authReducer>;
//   user: ReturnType<typeof userReducer>;
//   posts: ReturnType<typeof postReducer>;
//   otherUser: ReturnType<typeof otherUserReducer>;
//   search: ReturnType<typeof searchReducer>;
//   popup: ReturnType<typeof popUpReducer>;
// }
// interface RootState{
//   theme:ThemeState
// }
const rootReducer = combineReducers<any>({
  theme: themeReducer,
  auth: authReducer,
  user: userReducer,
  posts: postReducer,
  otherUser: otherUserReducer,
  search: searchReducer,
  popup: popUpReducer,
});
export default rootReducer;
