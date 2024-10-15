import authReducer from '@store/reducers/authRedicer';
import themeReducer from '@store/reducers/themeReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
