import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignUp } from '@pages/Auth/SignUp/SignUp';
import { persistor } from '@store/store';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createStore } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';

const initialState = {
  auth: {
    navigateToSetPassword: false,
    loading: false,
    error: null,
    user: {
      email: 'tteest@mail.com',
      phone: '1234567890',
      dateBirth: '12-12-2020',
      name: 'tetsing',
      avatar: null,
      profileImg: null,
      description: 'hi',
    },
  },
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'CHECK_USER_EXISTS':
      return { ...state, navigateToSetPassword: true };
    case 'RESET_USER_EXIST':
      return { ...state, navigateToSetPassword: false };
    case 'RESET_ERROR':
      return state;
    case 'CLEAR_ERROR':
      return state;
    default:
      return state;
  }
};

const store = createStore(reducer);

describe('SignUp Component', () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <SignUp />,
    },
  ]);
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch = mockDispatch;

    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    );
  });

  test('renders SignUp component', () => {
    expect(screen.getByText(/Create an account/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Phone number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });

  test('shows validation errors and disables button for invalid data', async () => {
    fireEvent.change(screen.getByPlaceholderText(/Name/i), {
      target: { value: 'b' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Phone number/i), {
      target: { value: '55' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'invalid-email' },
    });

    expect(
      await screen.findByText(/The field is filled in incorrectly/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Minimum number of characters 2/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeDisabled();
  });

  test('enables button and navigates on valid data', async () => {
    fireEvent.change(screen.getByPlaceholderText(/name/i), {
      target: { value: 'Test' },
    });
    fireEvent.change(screen.getByPlaceholderText(/phone number/i), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'testttt@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/month/i), {
      target: { value: '12' },
    });
    fireEvent.change(screen.getByLabelText(/day/i), {
      target: { value: '25' },
    });
    fireEvent.change(screen.getByLabelText(/year/i), {
      target: { value: '1990' },
    });

    await waitFor(() => {
      expect(screen.getByText(/Next/i)).not.toBeDisabled();
    });

    fireEvent.click(screen.getByText(/Next/i));
    // expect(mockDispatch).toHaveBeenCalledWith(
    //   expect.objectContaining({
    //     type: 'CHECK_USER_EXISTS',
    //     payload: {
    //       name: 'Test',
    //       phone: '1234567890',
    //       email: 'testttt@example.com',
    //       dateBirth: '1990-12-25',
    //     },
    //   })
    //   // expect.objectContaining({ type: 'RESET_ERROR' })
    // );
    // await waitFor(() => {
    //   expect(store.getState().auth.navigateToSetPassword).toBe(true);
    // });
  });
});
