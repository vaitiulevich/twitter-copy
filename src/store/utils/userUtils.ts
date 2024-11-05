import { sessionPeriod } from '@constants/constants';
import { loginSuccess, logoutRequest } from '@store/actions/authActions';
import { doc, getDoc } from 'firebase/firestore';
import { eventChannel } from 'redux-saga';

import { auth, db } from '../../firebase';

export function* fetchUserData(id: string): Generator {
  const userDocRef = doc(db, 'users', id);
  const userDoc = yield getDoc(userDocRef);
  const userData = userDoc.data();
  if (userData) {
    delete userData.password;
    return userData;
  }
  throw new Error('User not found');
}

export function createAuthChannel() {
  return eventChannel((emit) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const lastSignInTime = user.metadata.lastSignInTime;
        const endSessionTimestamp = lastSignInTime
          ? new Date(lastSignInTime).getTime() + sessionPeriod
          : 0;

        emit(loginSuccess(user.email || '', user.uid, endSessionTimestamp));
      } else {
        emit(logoutRequest());
      }
    });
    return () => unsubscribe();
  });
}
