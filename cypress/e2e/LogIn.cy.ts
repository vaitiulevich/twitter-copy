describe('Sign In Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/sign-in');
  });

  it('should allow users to log in with email and password', () => {
    cy.get('input[name="email"]').type('testtest@example.com');
    cy.get('input[name="password"]').type('Password123');
    cy.contains('button', 'Log In').should('be.visible').and('be.enabled');
  });

  it('should toggle phone number and password', () => {
    cy.get('button').contains('Sign in with phone number').click();
    cy.get('input[name="phone"]').should('be.visible');

    cy.get('button').contains('Sign in with email address').click();
    cy.get('input[name="email"]').should('be.visible');
  });

  it('should show an error if the password is incorrect', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.get('.error-block').should('be.visible');
  });
});
