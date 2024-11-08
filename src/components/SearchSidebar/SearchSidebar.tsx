import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { images } from '@constants/images';
import { searchRequest, searchSuccess } from '@store/actions/searchActions';
import {
  selectSearchLoad,
  selectSearchPosts,
  selectSearchUsers,
} from '@store/selectors';
import { debounce } from '@utils/debounce';
import classNames from 'classnames';

import './styles.scss';
import { SearchPostsResults } from './components/SearchPostsResults/SearchPostsResults';
import { SearchUsersResults } from './components/SearchUsersResults/SearchUsersResults';

export const SearchSidebar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const loading = useSelector(selectSearchLoad);
  const users = useSelector(selectSearchUsers);
  const posts = useSelector(selectSearchPosts);

  const debouncedSearch = debounce((value: string) => {
    dispatch(searchRequest(value.trim() ? value : ''));
  }, 1000);

  const changeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleFocus = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsFocused(true);
  };

  const handleBlur = () => {
    const id = setTimeout(() => {
      setIsFocused(false);
    }, 200);
    setTimeoutId(id);
  };

  const isHasResults =
    (posts && posts.length > 0) || (users && users.length > 0);

  const handleClearInput = () => {
    setSearchTerm('');
    dispatch(searchSuccess({ users: null, posts: null }));
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <aside className="search-sidebar">
      <img src={images.logo} alt="logo" className="mobile-header-logo" />
      <div className="search-inp-block">
        <button className="search-inp-btn">
          <img src={images.search} alt="search" />
        </button>
        <input
          placeholder="Search Twitter"
          value={searchTerm}
          onChange={changeSearchText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="search-inp"
        />
        {searchTerm && (
          <button
            onClick={handleClearInput}
            name="clear"
            className="clear-inp-btn"
          >
            <img src={images.clear} alt="clear" />
          </button>
        )}
      </div>
      {(users === null || posts === null) && searchTerm.trim() && (
        <div className="search-results">Nothing found</div>
      )}
      {(isHasResults || loading) && (
        <div
          className={classNames('search-results', {
            visible: isFocused || loading,
          })}
        >
          {isHasResults && <h2 className="search-headline">Search results</h2>}
          {posts && posts.length > 0 && (
            <>
              <h3 className="search-item-headline">Tweets</h3>
              <SearchPostsResults posts={posts} />
            </>
          )}
          {users && users.length > 0 && (
            <>
              <h3 className="search-item-headline">Users</h3>
              <SearchUsersResults searchTerm={searchTerm} users={users} />
            </>
          )}
          {loading && <p>Loading...</p>}
        </div>
      )}
    </aside>
  );
};
