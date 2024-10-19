import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { getBuildEnvVar } from './env';

const firebaseConfig = {
  apiKey: getBuildEnvVar('API_KEY'),
  authDomain: getBuildEnvVar('AUTH_DOMAIN'),
  projectId: getBuildEnvVar('PROJECT_ID'),
  storageBucket: getBuildEnvVar('STORAGE_BACKET'),
  messagingSenderId: getBuildEnvVar('MESS_SEND_ID'),
  appId: getBuildEnvVar('APP_ID'),
  measurementId: getBuildEnvVar('MEASUR_ID'),
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { analytics, auth, db, provider };
