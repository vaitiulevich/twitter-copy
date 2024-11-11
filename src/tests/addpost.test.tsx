import { Provider } from 'react-redux';
import { AddPostPanel } from '@components/AddPostPanel/AddPostPanel';
import { persistor } from '@store/store';
import { fireEvent, render, screen } from '@testing-library/react';
import { createStore } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';

const initialState = {
  user: {
    error: null,
    loading: false,
  },
  posts: {
    posts: [],
    visiblePostsCount: 1,
    selectPost: null,
    loading: false,
    isMorePosts: true,
    error: null,
  },
};
const reducer = (state = initialState, action: any) => state;
const store = createStore(reducer);

describe('AddPostPanel Component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AddPostPanel location="post-images" />
        </PersistGate>
      </Provider>
    );
  });

  test('renders AddPostPanel component correctly', () => {
    expect(screen.getByPlaceholderText('What’s happening')).toBeInTheDocument();
    expect(screen.getByText('Tweet')).toBeInTheDocument();
    expect(screen.getByText('Tweet')).toBeDisabled(); // Button should be disabled initially
  });

  test('enables Tweet button when content is entered', () => {
    const textarea = screen.getByPlaceholderText('What’s happening');
    fireEvent.change(textarea, { target: { value: 'New post content' } });

    const tweetButton = screen.getByText('Tweet');
    expect(tweetButton).not.toBeDisabled();
  });

  //   test('dispatches addPostRequest when Tweet button is clicked', async () => {
  //     const textarea = screen.getByPlaceholderText('What’s happening');
  //     fireEvent.change(textarea, { target: { value: 'New post content' } });

  //     const tweetButton = screen.getByText('Tweet');
  //     fireEvent.click(tweetButton);

  //     // const mockPostData = {
  //     //   content: ['New', 'post', 'content'],
  //     //   images: [],
  //     //   files: [],
  //     //   likes: [],
  //     //   userId: '123',
  //     //   userSlug: 'user123',
  //     //   userName: 'John Doe',
  //     //   userAvatar: null,
  //     //   timestamp: new Date().getTime(),
  //     //   postId: 'post1',
  //     // };

  //     await waitFor(() => {
  //       expect(addPostRequest).toHaveBeenCalledTimes(1);
  //     });
  //   });
});
