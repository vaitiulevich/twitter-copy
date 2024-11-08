import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignIn } from '@pages/Auth/SignIn/SignIn';
import { persistor } from '@store/store';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createStore } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';

import { auth } from '../firebase';

const initialState = {
  auth: {
    loading: false,
    error: null,
  },
  user: {
    userId: '',
  },
};

const reducer = (state = initialState, action: any) => state;
const store = createStore(reducer);

describe('SignIn Component', () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <SignIn />,
    },
  ]);

  beforeEach(() => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    );
  });

  test('renders SignIn component correctly', () => {
    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
  });

  test('switches between email and phone login', () => {
    fireEvent.click(screen.getByText(/Sign in with phone number/i));
    expect(screen.getByPlaceholderText(/Phone number/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Sign in with email address/i));
    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
  });

  test('validates email login and performs successful login', async () => {
    fireEvent.change(screen.getByPlaceholderText('Email address'), {
      target: { value: 'testuser@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText(/Log In/i));

    await act(async () => {
      await signInWithEmailAndPassword(
        auth,
        'testuser@example.com',
        'Q123456789'
      );
    });

    await waitFor(() => {
      expect(auth.currentUser).not.toBeNull();
    });
  });
});
