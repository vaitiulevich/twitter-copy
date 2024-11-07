import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SetPassword } from '@pages/Auth/SetPassword/SetPassword';
import { persistor } from '@store/store';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createStore } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';

import { auth } from '../firebase';

const initialState = {
  auth: {
    loading: false,
    error: null,
    user: { email: 'test@mail.com' },
  },
};

const reducer = (state = initialState, action: any) => state;
const store = createStore(reducer);

describe('SetPassword Component', () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <SetPassword />,
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

  test('renders SetPassword component correctly', () => {
    expect(screen.getByPlaceholderText(/Set Password/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Confirm password/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Log Up/i)).toBeInTheDocument();
  });

  test('validation for nomatching passwords', async () => {
    fireEvent.change(screen.getByPlaceholderText(/Set Password/i), {
      target: { value: 'Q123123123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Confirm password/i), {
      target: { value: 'Q999999999' },
    });
    expect(
      await screen.findByText(/Passwords must match/i)
    ).toBeInTheDocument();
  });

  test('validates passwords and creates user in Firebase', async () => {
    fireEvent.change(screen.getByPlaceholderText(/Set Password/i), {
      target: { value: 'Q123456789' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Confirm password/i), {
      target: { value: 'Q123456789' },
    });

    await act(async () => {
      await createUserWithEmailAndPassword(
        auth,
        'testuser@example.com',
        'Q123456789'
      );
    });

    await waitFor(() => {
      expect(auth.currentUser).not.toBeNull();
      expect(auth.currentUser?.email).toBe('testuser@example.com');
    });

    expect(auth.currentUser).not.toBeNull();
    if (auth.currentUser) {
      expect(auth.currentUser.email).toBe('testuser@example.com');
    }
  });
});
