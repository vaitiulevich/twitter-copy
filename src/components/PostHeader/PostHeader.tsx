import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostOptionsMenu } from '@components/PostOptionsMenu/PostOptionsMenu';
import { images } from '@constants/images';
import { PostState } from '@store/reducers/postReducer';
import { selectTheme } from '@store/selectors';
import { formatTimestamp } from '@utils/formatTimestamp';

import './styles.scss';

interface PostHeaderProps {
  post: PostState;
  isOriginPost: boolean;
}

export const PostHeader = ({ post, isOriginPost }: PostHeaderProps) => {
  const { theme } = useSelector(selectTheme);
  const { userName, userId, userSlug, timestamp } = post;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const togglePostMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);
  const isLigthTheme = theme === 'light';
  const optionIcon = isLigthTheme ? images.option : images.optionDark;
  const optionImg = () => {
    return <img src={optionIcon} alt="options" />;
  };

  const linkFromUserName = isOriginPost ? '/profile' : `/home/user/${userId}`;
  return (
    <div className="post-header">
      <div className="post-header-author">
        <h3 title={userName} className="post-author-name">
          <Link to={linkFromUserName}>{userName}</Link>
        </h3>
        <span className="post-author-slug">{userSlug}</span>
        <span className="post-date">{formatTimestamp(timestamp)}</span>
      </div>
      {isOriginPost && (
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
      )}
    </div>
  );
};
