import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostOptionsMenu } from '@components/PostOptionsMenu/PostOptionsMenu';
import { images } from '@constants/images';
import { updatePostLikesRequest } from '@store/actions/postActions';
import { PostState } from '@store/reducers/userReducer';
import { selectThemeType } from '@store/selectors';
import { formatTimestamp } from '@utils/formatTimestamp';
import classNames from 'classnames';

import './styles.scss';

export const Post = ({ post, userId }: { post: PostState; userId: string }) => {
  const [likes, setLikes] = useState(post.likes);
  const userHasLiked = likes.includes(userId);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let classes = classNames('post-images');

  if (post.images) {
    classes = classNames('post-images', {
      'one-image': post.images.length === 1,
      'two-images': post.images.length === 2,
      'three-images': post.images.length === 3,
      'four-images': post.images.length === 4,
    });
  }

  const handleLikeToggle = () => {
    const newLikes = userHasLiked
      ? likes.filter((id) => id !== userId)
      : [...likes, userId];

    setLikes(newLikes);
    if (post.id) {
      dispatch(updatePostLikesRequest(post.id, newLikes));
    }
  };
  const togglePostMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const theme = useSelector(selectThemeType);

  return (
    <div className="post">
      <div className="post-avatar">
        <img src={post.userAvatar ?? images.avatar} alt="avatar" />
      </div>
      <div className="post-content">
        <div className="post-header">
          <div className="post-header-author">
            <h3 className="post-author-name">{post.userName}</h3>
            <span className="post-author-slug">{post.userSlug}</span>
            <span className="post-date">{formatTimestamp(post.timestamp)}</span>
          </div>
          <button onClick={togglePostMenu} className="post-options-btn">
            <img
              src={theme === 'light' ? images.option : images.optionDark}
              alt="options"
            />
          </button>
          <PostOptionsMenu
            isOpen={isMenuOpen}
            post={post}
            togglePostMenu={togglePostMenu}
          />
        </div>
        <div className="post-text">{post.content}</div>
        {post.images && post.images?.length > 0 && (
          <div className={classes}>
            {post.images.map((item, index) => (
              <img
                src={item as string}
                key={index}
                className={`post-image-${index + 1}`}
                alt="post"
              />
            ))}
          </div>
        )}
        <div className="post-like">
          <img
            className="post-like-img"
            onClick={handleLikeToggle}
            src={userHasLiked ? images.likeFill : images.likeEmpty}
            alt="like"
          />
          {post.likes.length}
        </div>
      </div>
    </div>
  );
};
