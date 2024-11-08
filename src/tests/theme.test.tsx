import { Provider } from 'react-redux';
import ThemeToggle from '@components/ThemeToggle/ThemeToggle';
import rootReducer from '@store/reducers';
import { persistor } from '@store/store';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { applyMiddleware, createStore } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import { thunk } from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeToggle />
        </PersistGate>
      </Provider>
    );
  });

  test('renders ThemeToggle component correctly', () => {
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toHaveClass('toggle-input light');
  });

  test('dispatches toggleThemeRequest on change', async () => {
    fireEvent.click(screen.getByRole('checkbox'));

    await waitFor(() => {
      expect(screen.getByRole('checkbox')).toHaveClass('toggle-input light');
    });
  });

  test('dispatches changes data-theme on body', async () => {
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toHaveClass('toggle-input light');
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(document.body.getAttribute('data-theme'));
    });
  });
});
