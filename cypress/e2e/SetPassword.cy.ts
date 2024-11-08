import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../support/e2e';

describe('SetPassword Component', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('http://localhost:3000/sign-up');

    cy.get('input[name="name"]').type('Test');
    cy.get('input[name="phone"]').type('1234567890');
    cy.get('input[name="email"]').type('testtest@example.com');

    cy.get('[aria-label="year"]').select('1990');
    cy.get('[aria-label="month"]').select('January');
    cy.get('[aria-label="day"]').select('1');

    cy.contains('Next').click();
  });

  it('should show error message when passwords do not match', () => {
    cy.get('input[placeholder="Set Password"]').type('password123');
    cy.get('input[placeholder="Confirm password"]').type('differentPassword');

    cy.contains('Passwords must match').should('be.visible');
  });
  it('should submit the form with matching passwords', () => {
    cy.get('input[placeholder="Set Password"]').type('Password123');
    cy.get('input[placeholder="Confirm password"]').type('Password123');

    cy.contains('button', 'Log Up').should('be.visible').and('be.enabled');
  });

  it('should display the logo and form fields', () => {
    const email = 'testtest@example.com';
    const password = 'Password123';
    console.log(auth);

    cy.contains('button', 'Log Up').should('be.visible').and('be.enabled');

    createUserWithEmailAndPassword(auth, email, password);
  });
});
