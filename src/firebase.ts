import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
} from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { getBuildEnvVar } from './env';

// const firebaseConfig = {
//   apiKey: getBuildEnvVar('API_KEY'),
//   authDomain: getBuildEnvVar('AUTH_DOMAIN'),
//   projectId: getBuildEnvVar('PROJECT_ID'),
//   storageBucket: getBuildEnvVar('STORAGE_BACKET'),
//   messagingSenderId: getBuildEnvVar('MESS_SEND_ID'),
//   appId: getBuildEnvVar('APP_ID'),
//   measurementId: getBuildEnvVar('MEASUR_ID'),
// };
const firebaseConfig = {
  apiKey: 'AIzaSyCdzpqC3COsaUHHYZa7xaYkStfSNyjvBIA',
  authDomain: 'twitter-copy-92524.firebaseapp.com',
  projectId: 'twitter-copy-92524',
  storageBucket: 'twitter-copy-92524.appspot.com',
  messagingSenderId: '387846671173',
  appId: '1:387846671173:web:df309b863ea7f318ca0c2c',
  measurementId: 'G-3CZFKQPK4B',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

connectAuthEmulator(auth, 'http://127.0.0.1:9099');
connectFirestoreEmulator(db, '127.0.0.1', 8080);

export { auth, db, provider, storage };
