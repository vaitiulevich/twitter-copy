// cypress/support/index.js
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { auth } from './e2e';

// Set up any Cypress-specific commands for Firebase here
// Cypress.Commands.add("signInWithEmulator", (email, password) => {
//   return auth.signInWithEmailAndPassword(email, password);
// });

// Cypress.Commands.add("signOutEmulator", () => {
//   return auth.signOut();
// });
// beforeEach(() => {
//   cy.clearLocalStorage();
//   cy.clearCookies();
// });

Cypress.Commands.add('signInWithEmulator', (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
});

Cypress.Commands.add('signOutEmulator', () => {
  return signOut(auth);
});

Cypress.Commands.add('signUpWithEmulator', (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
});
Cypress.Commands.add(
  'loginUser',
  (email = 'testtest@example.com', password = 'Password123') => {
    // Simulate Firebase login
    cy.window().then((win) => {
      return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          // You can optionally save the user's data to session storage or set cookies
          cy.setCookie('user_id', user.uid); // Example of setting a cookie with the user ID
          cy.setCookie('auth_token', user.stsTokenManager.accessToken); // Example of setting a token
        })
        .catch((error) => {
          throw new Error(error.message); // Handle error (e.g., wrong password, no internet, etc.)
        });
    });
  }
);
// Clear Firestore and Auth between tests if needed
afterAll(() => {
  // Logic to clear data from Firestore and Auth after each test
  // For example, deleting user documents or specific collections
});
