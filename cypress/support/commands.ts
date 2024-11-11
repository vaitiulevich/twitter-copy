/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
// declare namespace Cypress {
//   interface Chainable {
//     signInWithEmulator(email: string, password: string): any;
//     signOutEmulator(): any;
//     signUpWithEmulator(email: string, password: string): any;
//   }
// }
// Cypress.Commands.add('signInWithEmulator', (email, password) => {
//   return signInWithEmailAndPassword(auth, email, password);
// });
// Cypress.Commands.add('login', () => {
//   cy.window().then((window) => {
//     const reduxStore = window.store;

//     reduxStore.dispatch({
//       type: 'auth/setAuthUid',
//       payload: 'mock-user-id', // Set a mock user ID
//     });

//     reduxStore.dispatch({
//       type: 'auth/setAuthTimestamp',
//       payload: new Date().getTime() + 3600000, // Set a valid timestamp
//     });
//   });
// });
