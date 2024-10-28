import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostHeader } from '@components/PostHeader/PostHeader';
import { images } from '@constants/images';
import { updatePostLikesRequest } from '@store/actions/postActions';
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
  const [likes, setLikes] = useState(post.likes);
  const userHasLiked = likes.includes(userId);
  const dispatch = useDispatch();
  const isOriginPost = post.userId === userId;

  const handleLikeToggle = () => {
    const updatedLikes = userHasLiked
      ? likes.filter((id) => id !== userId)
      : [...likes, userId];

    setLikes(updatedLikes);
    if (post.id) {
      dispatch(updatePostLikesRequest(post.id, updatedLikes));
    }
  };

  const renderImages = () => {
    if (!post.images || post.images.length === 0) return null;

    const classes = classNames('post-images', {
      'one-image': post.images.length === 1,
      'two-images': post.images.length === 2,
      'three-images': post.images.length === 3,
      'four-images': post.images.length === 4,
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
      <div className="post-text">{post.content}</div>
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
