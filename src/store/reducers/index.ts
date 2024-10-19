import authReducer from '@store/reducers/authRedicer';
import themeReducer from '@store/reducers/themeReducer';
import userReducer from '@store/reducers/userReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;
