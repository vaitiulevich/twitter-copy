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

  it('should display search tweet', () => {
    cy.wait(3000);

    cy.get('input[placeholder="Search Twitter"]').should('be.visible');
  });
  it('should show search results after typing', () => {
    cy.get('input[placeholder="Search Twitter"]').type('Test');

    cy.window().then((window) => {
      const reduxStore = window.store;
      console.log('Redux Store:', reduxStore);
      reduxStore.dispatch({
        type: 'SEARCH_SUCCESS',
        payload: {
          users: [{ userId: '123', name: 'Test' }],
          poats: [
            {
              id: '222',
              userName: 'Test',
              userId: '123',
              content: ['hi', 'hi'],
            },
          ],
        },
      });
    });

    cy.wait(1000);
    cy.contains('Search results').should('be.visible');
    cy.contains('Tweets').should('be.visible');
    cy.contains('Users').should('be.visible');
  });
});
