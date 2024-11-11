import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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
const db = getFirestore(app);
const storage = getStorage(app);

// connectAuthEmulator(auth, 'http://localhost:9099');
// connectFirestoreEmulator(db, '127.0.0.1', 8080);

export { auth, db, provider, storage };
