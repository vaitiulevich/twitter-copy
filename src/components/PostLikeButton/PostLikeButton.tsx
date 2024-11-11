import { useDispatch, useSelector } from 'react-redux';
import { images } from '@constants/images';
import { updatePostLikesRequest } from '@store/actions/postActions';
import { selectUserId } from '@store/selectors';

import './styles.scss';

interface PostLikeButtonProps {
  id?: string;
  likes: string[];
}

export const PostLikeButton = ({ id, likes }: PostLikeButtonProps) => {
  const userId = useSelector(selectUserId);
  const userHasLiked = likes.includes(userId);
  const dispatch = useDispatch();

  const handleLikeToggle = () => {
    const updatedLikes = userHasLiked
      ? likes.filter((id) => id !== userId)
      : [...likes, userId];

    if (id) {
      dispatch(updatePostLikesRequest(id, updatedLikes));
    }
  };
  return (
    <div className="post-like">
      <img
        className="post-like-img"
        onClick={handleLikeToggle}
        src={userHasLiked ? images.likeFill : images.likeEmpty}
        alt="like"
      />
      {likes.length}
    </div>
  );
};
