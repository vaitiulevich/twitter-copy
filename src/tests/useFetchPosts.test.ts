import { hideErrorPopUp } from '@store/actions/popUpActions';
import { fetchPostsRequest } from '@store/actions/postActions';
import { act, renderHook } from '@testing-library/react-hooks';
import { useFetchPosts } from '@utils/hooks/useFetchPosts';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('@store/actions/postActions', () => ({
  fetchPostsRequest: jest.fn(),
  loadMorePosts: jest.fn(),
}));

jest.mock('@store/actions/popUpActions', () => ({
  hideErrorPopUp: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockSelector = jest.fn();

describe('useFetchPosts', () => {
  const userId = 'testUserId';
  const query = jest.fn();
  const location = 'testLocation';

  beforeEach(() => {
    mockSelector.mockReturnValue({
      isMorePosts: true,
      loading: false,
      posts: [],
      visiblePostsCount: 0,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch fetchPostsRequest on mount', () => {
    renderHook(() => useFetchPosts(userId, query, location));
    expect(mockDispatch).toHaveBeenCalledWith(fetchPostsRequest(userId, query));
  });

  it('should handle error close', () => {
    const { result } = renderHook(() => useFetchPosts(userId, query, location));
    act(() => {
      result.current.handleClose();
    });
    expect(mockDispatch).toHaveBeenCalledWith(hideErrorPopUp());
  });
});
