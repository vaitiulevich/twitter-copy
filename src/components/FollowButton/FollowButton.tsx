import { useDispatch, useSelector } from 'react-redux';
import { setFollowingStatus } from '@store/actions/otherUserActions';
import {
  isUserFollowing,
  selectOtherUserLoad,
  selectUserId,
} from '@store/selectors';
import { RootState } from '@store/types';

import './styles.scss';

export const FollowButton = ({ id = '' }: { id?: string }) => {
  const originId = useSelector(selectUserId);
  const loading = useSelector(selectOtherUserLoad);
  const dispatch = useDispatch();

  const isFollowing = useSelector((state: RootState) =>
    isUserFollowing(state, originId)
  );

  const handleFollow = () => {
    if (!id || isFollowing === undefined) return;
    dispatch(setFollowingStatus(isFollowing, id, originId));
  };
  const textFollowing = isFollowing ? 'Unfollow' : 'Follow';

  return (
    <button onClick={handleFollow} disabled={loading} className="follow-button">
      {loading ? 'Loading...' : textFollowing}
    </button>
  );
};
