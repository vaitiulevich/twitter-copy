import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOADING } from '@constants/messages';
import { setFollowingStatus } from '@store/actions/otherUserActions';
import { UserState } from '@store/reducers/userReducer';
import { selectOtherUserFollowers, selectUserId } from '@store/selectors';

import './styles.scss';

export const FollowButton = ({
  id = '',
  user,
  searchTerm,
}: {
  id?: string;
  user: UserState;
  searchTerm?: string;
}) => {
  const originId = useSelector(selectUserId);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userFollowers = user.followers || [];
  const isFollowingSearch = userFollowers.includes(originId);
  const isFollowing = isFollowingSearch;

  const otherUserFollowers = useSelector(selectOtherUserFollowers) || [];
  const [textFollowing, setTextFollowing] = useState(
    isFollowing ? 'Unfollow' : 'Follow'
  );

  const handleFollow = () => {
    dispatch(
      setFollowingStatus(isFollowing, id, originId, searchTerm ?? undefined)
    );
    setLoading(true);
  };

  useEffect(() => {
    setTextFollowing(isFollowing ? 'Unfollow' : 'Follow');
    setLoading(false);
  }, [otherUserFollowers, user.followers]);

  return (
    <button onClick={handleFollow} disabled={loading} className="follow-button">
      {loading ? LOADING : textFollowing}
    </button>
  );
};
