import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setFollowingStatus } from '@store/actions/otherUserActions';
import { UserState } from '@store/reducers/userReducer';
import { isUserFollowing } from '@store/selectors';
import { RootState } from '@store/types';

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
  const originId = useSelector((state: RootState) => state.user.userId);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userFollowers = user.followers || [];
  const isFollowingSearch = userFollowers.includes(originId);
  const isFollowing = isFollowingSearch;

  const otherUserFollowers =
    useSelector((state: RootState) => state.otherUser.otherUser?.followers) ||
    [];
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
      {loading ? 'Loading...' : textFollowing}
    </button>
  );
};
