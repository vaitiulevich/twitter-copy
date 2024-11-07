import { Provider } from 'react-redux';
import { EditProfileForm } from '@components/EditProfileForm/EditProfileForm';
import * as actions from '@store/actions/userActions';
import { persistor } from '@store/store';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createStore } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';

const initialState = {
  user: {
    userId: '1',
    name: 'Test',
    phone: '(123) 45-67-890',
    description: 'hi',
    dateBirth: '1990-09-09',
  },
};
const store = createStore((state = initialState, action: any) => state);

describe('EditProfileForm', () => {
  const mockOnCloseModal = jest.fn();

  beforeEach(() => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <EditProfileForm onCloseModal={mockOnCloseModal} />
        </PersistGate>
      </Provider>
    );
  });
  test('renders form with initial data', () => {
    expect(screen.getByPlaceholderText('Name')).toHaveValue('Test');
    expect(screen.getByPlaceholderText('Phone')).toHaveValue('(123) 45-67-890');
    expect(screen.getByPlaceholderText('description')).toHaveValue('hi');
    expect(screen.getByPlaceholderText('dateBirth')).toHaveValue('1990-09-09');
  });
  test('shows validation errors when fields are empty', async () => {
    const submitButton = screen.getByRole('button', { name: /update/i });

    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByPlaceholderText('Phone'), {
      target: { value: '' },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    const requiredFieldErrors = await screen.findAllByText(/Required field/i);
    expect(requiredFieldErrors.length).toBeGreaterThan(0);
    expect(requiredFieldErrors[0]).toBeInTheDocument();
  });
  test('enables submit button when all fields are valid', async () => {
    const submitButton = screen.getByText('Update');

    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Phone'), {
      target: { value: '987-654-3210' },
    });

    fireEvent.click(submitButton);
    expect(submitButton).toBeEnabled();
  });
  test('sets selecte image as preview for avatar', async () => {
    const avatarInput = screen.getByTestId('profile-avatar');
    const file = new File(['dummy content'], 'avatar.jpg', {
      type: 'image/jpeg',
    });
    fireEvent.change(avatarInput, { target: { files: [file] } });
    fireEvent.change(avatarInput, { target: { files: [file] } });

    expect(screen.getByAltText('Set profile image')).toHaveAttribute(
      'src',
      'test-file-stub'
    );
  });
  test('dispatches updateUserDataRequest action on form submit', async () => {
    const spy = jest.spyOn(actions, 'updateUserDataRequest');
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'New Name' },
    });

    fireEvent.submit(screen.getByText('Update'));

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(
        '1',
        expect.objectContaining({
          name: 'New Name',
          avatarFile: null,
          bannerFile: null,
          dateBirth: '1990-09-09',
          description: 'hi',
          phone: '(123) 45-67-890',
        }),
        expect.any(Function)
      );
    });

    spy.mockRestore();
  });
});
