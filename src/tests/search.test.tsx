import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SearchSidebar } from '@components/SearchSidebar/SearchSidebar';
import { persistor } from '@store/store';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createStore } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';

const initialState = {
  search: {
    loading: false,
    users: null,
    posts: [
      {
        postId: '1',
        content: ['This', 'is', 'Hi', 'test', 'post'],
        likes: [],
        timestamp: Date.now(),
        userId: '1',
      },
    ],
  },
};

const store = createStore((state = initialState, action: any) => state);

describe('SearchSidebar Component', () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <SearchSidebar />,
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

  test('searches for posts and users and displays results', async () => {
    const searchInput = screen.getByPlaceholderText('Search Twitter');
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'Hi' } });

    await waitFor(() => {
      expect(screen.getByText('Search results')).toBeInTheDocument();
      expect(screen.getByText('Tweets')).toBeInTheDocument();
    });
  });

  test('searches for posts and users with not found value', async () => {
    const searchInput = screen.getByPlaceholderText('Search Twitter');
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'Hikkkkkk' } });

    await waitFor(() => {
      expect(screen.getByText('Nothing found')).toBeInTheDocument();
    });
  });

  test('clears input field and search results', async () => {
    const searchInput = screen.getByPlaceholderText('Search Twitter');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    const clearButton = screen.getByRole('button', { name: /clear/i });
    fireEvent.click(clearButton);

    expect(searchInput).toHaveValue('');
  });
});
