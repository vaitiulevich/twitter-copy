import { memo } from 'react';
import { images } from '@constants/images';

import './styles.scss';

interface PostLikeButtonProps {
  userHasLiked: boolean;
  onToggleLike: () => void;
  likesCount: number;
}

export const PostLikeButton = memo(
  ({ userHasLiked, onToggleLike, likesCount }: PostLikeButtonProps) => {
    return (
      <div className="post-like">
        <img
          className="post-like-img"
          onClick={onToggleLike}
          src={userHasLiked ? images.likeFill : images.likeEmpty}
          alt="like"
        />
        {likesCount}
      </div>
    );
  }
);
