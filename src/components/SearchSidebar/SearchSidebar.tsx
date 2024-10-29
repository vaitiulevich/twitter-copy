import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FollowButton } from '@components/FollowButton/FollowButton';
import { PostHeader } from '@components/PostHeader/PostHeader';
import { UserShortInfo } from '@components/UserShortInfo/UserShortInfo';
import { images } from '@constants/images';
import { searchRequest } from '@store/actions/searchActions';
import {
  selectSearchLoad,
  selectSearchPosts,
  selectSearchUsers,
  selectUserId,
} from '@store/selectors';
import { debounce } from '@utils/debounce';
import classNames from 'classnames';

import './styles.scss';

export const SearchSidebar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const loading = useSelector(selectSearchLoad);
  const users = useSelector(selectSearchUsers);
  const posts = useSelector(selectSearchPosts);
  const originId = useSelector(selectUserId);

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

  const isHasResults = posts.length > 0 || users.length > 0;

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const renderUsersResults = () => {
    return users.map((user) => (
      <div className="search-user-results" key={user.id}>
        <UserShortInfo
          avatar={user.avatar}
          name={user.name}
          userSlug={user.userSlug}
          navTo={`/home/user/${user.id}`}
        />
        {originId !== `${user.id}` && <FollowButton id={`${user.id}`} />}
      </div>
    ));
  };

  const renderPostssResults = () => {
    return posts.map((post) => (
      <div className="search-post-results" key={post.id}>
        <PostHeader post={post} isOriginPost={false} />
        {post.content && (
          <Link to={`/home/posts/${post.id}`}>
            <p>{post.content.join(' ')}</p>
          </Link>
        )}
      </div>
    ));
  };

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
      </div>
      {(isHasResults || loading) && (
        <div
          className={classNames('search-results', {
            visible: isFocused || loading,
          })}
        >
          {isHasResults && <h2 className="search-headline">Search results</h2>}
          {posts.length > 0 && (
            <>
              <h3 className="search-item-headline">Tweets</h3>
              {renderPostssResults()}
            </>
          )}
          {users.length > 0 && (
            <>
              <h3 className="search-item-headline">Users</h3>
              {renderUsersResults()}
            </>
          )}
          {loading && <p>Loading...</p>}
        </div>
      )}
    </aside>
  );
};
