import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../firebase';

describe('Authentication Tests', () => {
  const email = 'test@example.com';
  const password = 'Password123';

  test('User Registration', async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      expect(userCredential.user).toBeDefined();
      expect(userCredential.user.email).toBe(email);
    } catch (error) {
      // console.error('Registration failed:', error);
      throw error;
    }
  });

  test('User Login', async () => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    expect(userCredential.user).toBeDefined();
    expect(userCredential.user.email).toBe(email);
  });
});
