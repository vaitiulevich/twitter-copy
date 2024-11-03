import { useDispatch, useSelector } from 'react-redux';
import { images } from '@constants/images';
import { updatePostLikesRequest } from '@store/actions/postActions';
import { PostState } from '@store/reducers/postReducer';
import { RootState } from '@store/types';

import './styles.scss';

interface PostLikeButtonProps {
  post: PostState;
}

export const PostLikeButton = ({ post }: PostLikeButtonProps) => {
  const likes = post.likes;
  const userId = useSelector((state: RootState) => state.user.userId);
  const userHasLiked = likes.includes(userId);
  const dispatch = useDispatch();

  const handleLikeToggle = () => {
    const updatedLikes = userHasLiked
      ? likes.filter((id) => id !== userId)
      : [...likes, userId];

    if (post.id) {
      dispatch(updatePostLikesRequest(post.id, updatedLikes));
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
