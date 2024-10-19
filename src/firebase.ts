import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { analytics, auth, db };
