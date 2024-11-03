import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFollowingStatus } from '@store/actions/otherUserActions';
import { UserState } from '@store/reducers/userReducer';
import { RootState } from '@store/types';

import './styles.scss';

export const FollowButtonSearch = ({
  id = '',
  user,
  searchTerm,
}: {
  id?: string;
  user: UserState;
  searchTerm: string;
}) => {
  const originId = useSelector((state: RootState) => state.user.userId);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userFollowers = user.followers;
  const isFollowingSearch = userFollowers.includes(originId);
  const [textFollowing, setTextFollowing] = useState(
    isFollowingSearch ? 'Unfollow' : 'Follow'
  );

  const handleFollow = () => {
    dispatch(setFollowingStatus(isFollowingSearch, id, originId, searchTerm));
    setLoading(true);
  };

  useEffect(() => {
    setTextFollowing(isFollowingSearch ? 'Unfollow' : 'Follow');
    setLoading(false);
  }, [user.followers]);

  return (
    <button onClick={handleFollow} disabled={loading} className="follow-button">
      {loading ? 'Loading...' : textFollowing}
    </button>
  );
};
