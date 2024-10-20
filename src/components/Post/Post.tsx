import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { images } from '@constants/images';
import { updatePostLikesRequest } from '@store/actions/postActions';
import { PostState } from '@store/reducers/userReducer';
import { formatTimestamp } from '@utils/formatTimestamp';

import './styles.scss';

export const Post = ({ post, userId }: { post: PostState; userId: string }) => {
  const [likes, setLikes] = useState(post.likes);
  const userHasLiked = likes.includes(userId);
  const dispatch = useDispatch();

  const handleLikeToggle = () => {
    const newLikes = userHasLiked
      ? likes.filter((id) => id !== userId)
      : [...likes, userId];

    setLikes(newLikes);
    if (post.id) {
      dispatch(updatePostLikesRequest(post.id, newLikes));
    }
  };

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
          <button className="post-options-btn">
            <img src={images.option} alt="options" />
          </button>
        </div>
        <div className="post-text">{post.content}</div>
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
