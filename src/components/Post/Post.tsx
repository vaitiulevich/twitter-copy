import { Link } from 'react-router-dom';
import { PostHeader } from '@components/PostHeader/PostHeader';
import { PostLikeButton } from '@components/PostLikeButton/PostLikeButton';
import { UPLOAD_IMG_COUNT } from '@constants/constants';
import { images } from '@constants/images';
import { PostState } from '@store/reducers/postReducer';
import classNames from 'classnames';

import './styles.scss';

export const Post = ({
  post,
  userId,
  navigateTo,
}: {
  post: PostState;
  userId: string;
  navigateTo?: string;
}) => {
  const isOriginPost = post.userId === userId;
  const renderImages = () => {
    if (!post.images || !post.images.length) return null;

    const imageCount = post.images.length;
    const calssesRange = imageCount > 0 && imageCount <= UPLOAD_IMG_COUNT;
    const classes = classNames('post-images', {
      [`image-number-${imageCount}`]: calssesRange,
    });

    return (
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
    );
  };

  const postContent = (
    <div>
      <div className="post-text">
        {Array.isArray(post.content) && post.content.join(' ')}
      </div>
      {renderImages()}
    </div>
  );
  return (
    <div className="post">
      <div className="post-avatar">
        <img src={post.userAvatar ?? images.avatar} alt="avatar" />
      </div>
      <div className="post-content">
        <PostHeader post={post} isOriginPost={isOriginPost} />
        {navigateTo ? <Link to={navigateTo}>{postContent}</Link> : postContent}
        <PostLikeButton post={post} />
      </div>
    </div>
  );
};
