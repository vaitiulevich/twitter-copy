import { AuthState } from '@store/types/auth/types';
import { ThemeState } from '@store/types/theme/types';

import { UserState } from './reducers/userReducer';

export type RootState = {
  theme: ThemeState;
  auth: AuthState;
  user: UserState;
};
