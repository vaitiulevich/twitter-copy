import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostOptionsMenu } from '@components/PostOptionsMenu/PostOptionsMenu';
import { images } from '@constants/images';
import { PostState } from '@store/reducers/postReducer';
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
  const optionIcon = isLigthTheme ? images.option : images.optionDark;
  const optionImg = () => {
    return <img src={optionIcon} alt="options" />;
  };
  const linkFromUserName = isOriginPost
    ? '/profile'
    : `/home/user/${post.userId}`;
  return (
    <div className="post-header">
      <div className="post-header-author">
        <h3 className="post-author-name">
          <Link to={linkFromUserName}>{post.userName}</Link>
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
