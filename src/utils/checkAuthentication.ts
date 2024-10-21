import { auth } from '../firebase';

export const checkAuthentication = () => {
  const user = auth.currentUser;
  return !!user;
};
