// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

import './commands';

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

initializeApp(firebaseConfig);

// Set up Firebase services
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

// Connect to the emulator (for local testing)
connectAuthEmulator(auth, 'http://127.0.0.1:9099');
connectFirestoreEmulator(db, 'localhost', 8080);
connectStorageEmulator(storage, 'localhost', 9199);

export { auth, db, storage };

// Alternatively you can use CommonJS syntax:
// require('./commands')
