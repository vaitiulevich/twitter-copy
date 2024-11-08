import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../support/e2e';

describe('Add Post (Tweet) functionality', () => {
  const email = 'testtest@example.com';
  const password = 'Password123';
  beforeEach(() => {
    cy.visit('http://localhost:3000/sign-in');
    cy.wait(1000);
    cy.window().then((window) => {
      const reduxStore = window.store;
      console.log('Redux Store:', reduxStore);
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          reduxStore.dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { email, uid: auth.currentUser?.uid, password },
          });
          reduxStore.dispatch({
            type: 'GET_USER_DATA_SUCCESS',
            payload: {
              email,
              phone: '(123) 45-67-890',
              dateBirth: '1990-09-09',
              name: 'Test',
              avatar: null,
              profileImg: null,
              description: 'hi',
            },
          });
          reduxStore.dispatch({
            type: 'FETCH_POSTS_SUCCESS',
            payload: {
              posts: [
                {
                  postId: '1',
                  userId: auth.currentUser?.uid,
                  userName: 'Test',
                  userSlug: 'string',
                  timestamp: new Date().getTime(),
                  likes: [],
                  content: ['Hi'],
                  userAvatar: null,
                },
              ],
            },
          });
        })
        .catch((err) => console.log(err));
    });
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
  });

  it('should display user info', () => {
    cy.wait(3000);

    cy.contains('Test').should('be.visible');
  });

  it('open edit modal', () => {
    cy.contains('Edit profile').click();
    cy.contains('Update').should('be.visible');
  });
  it('should show validation errors edit modal', () => {
    cy.contains('Edit profile').click();
    cy.get('input[placeholder="Name"]').clear().type('T');

    cy.contains('Minimum number of characters 2').should('be.visible');
  });
  it('should show an error when the date is in the future', () => {
    cy.contains('Edit profile').click();

    const futureDate = new Date('9999-09-09');

    cy.get('input[name="dateBirth"]')
      .clear()
      .type(futureDate.toISOString().split('T')[0]);

    cy.contains('Date of birth is invalid').should('be.visible');
    const farPastDate = new Date();
    farPastDate.setFullYear(farPastDate.getFullYear() - 150);

    cy.get('input[name="dateBirth"]')
      .clear()
      .type(farPastDate.toISOString().split('T')[0]);

    cy.contains('Date of birth is invalid').should('be.visible');
  });
});
