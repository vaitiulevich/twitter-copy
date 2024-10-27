import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostOptionsMenu } from '@components/PostOptionsMenu/PostOptionsMenu';
import { images } from '@constants/images';
import { PostState } from '@store/reducers/userReducer';
import { selectThemeType } from '@store/selectors';
import { formatTimestamp } from '@utils/formatTimestamp';

import './styles.scss';

interface PostHeaderProps {
  post: PostState;
  isOriginPost: boolean;
}

export const PostHeader = ({ post, isOriginPost }: PostHeaderProps) => {
  const theme = useSelector(selectThemeType);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const togglePostMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const isLigthTheme = theme === 'light';
  const optionImg = () => {
    return (
      <img
        src={isLigthTheme ? images.option : images.optionDark}
        alt="options"
      />
    );
  };
  return (
    <div className="post-header">
      <div className="post-header-author">
        <h3 className="post-author-name">
          {isOriginPost ? (
            post.userName
          ) : (
            <Link to={`/user/${post.userSlug}`}>{post.userName}</Link>
          )}
        </h3>
        <span className="post-author-slug">{post.userSlug}</span>
        <span className="post-date">{formatTimestamp(post.timestamp)}</span>
      </div>
      {isOriginPost ? (
        <>
          <button onClick={togglePostMenu} className="post-options-btn">
            {optionImg()}
          </button>
          <PostOptionsMenu
            isOpen={isMenuOpen}
            post={post}
            togglePostMenu={togglePostMenu}
          />
        </>
      ) : (
        optionImg()
      )}
    </div>
  );
};
