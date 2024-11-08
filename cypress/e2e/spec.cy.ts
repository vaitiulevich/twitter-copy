describe('SignUp Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/sign-up');
  });

  it('should render form elements correctly', () => {
    cy.get('.sign-up-section').should('exist');
    cy.get('input[name="name"]').should('exist');
    cy.get('input[name="phone"]').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('.date-panel-info').should('exist');
    cy.contains('Create an account').should('exist');
    cy.contains('Next').should('exist');
  });

  it('should validate form fields', () => {
    cy.contains('Next').should('be.disabled');

    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="email"]').blur();
    cy.contains('The field is filled in incorrectly').should('be.visible');
  });

  it('should enable the Next button after filling form', () => {
    cy.get('input[name="name"]').type('Test');
    cy.get('input[name="phone"]').type('1234567890');
    cy.get('input[name="email"]').type('test@example.com');

    cy.get('[aria-label="year"]').select('1990');
    cy.get('[aria-label="month"]').select('January');
    cy.get('[aria-label="day"]').select('1');

    cy.contains('Next').should('not.be.disabled');
  });

  it('should dispatch action on form submit', () => {
    cy.get('input[name="name"]').type('Test');
    cy.get('input[name="phone"]').type('1234567890');
    cy.get('input[name="email"]').type('test@example.com');

    cy.get('[aria-label="year"]').select('1990');
    cy.get('[aria-label="month"]').select('January');
    cy.get('[aria-label="day"]').select('1');

    cy.contains('Next').click();

    cy.url().should('include', '/set-password');
  });
});
