import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditProfileButton } from '@components/EditProfileButton/EditProfileButton';
import { FollowButton } from '@components/FollowButton/FollowButton';
import { images } from '@constants/images';
import { getTotalUsersPosts } from '@store/actions/postActions';
import { UserState } from '@store/reducers/userReducer';
import { selectCountPosts } from '@store/selectors';
import { RootState } from '@store/types';

import './styles.scss';
export const ProfileHead = ({
  user,
  isOriginUser,
}: {
  user: UserState;
  isOriginUser: boolean;
}) => {
  const dispatch = useDispatch();
  const { userId } = user;
  let countPosts = useSelector(selectCountPosts);
  const { posts } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (userId) {
      dispatch(getTotalUsersPosts(userId));
    }
  }, [posts]);
  return (
    <div>
      <header className="profile-header">
        <h3>{user.name}</h3>
        <p>{countPosts} Tweets</p>
      </header>
      <div className="profile-hero-panel">
        <div className="profile-hero">
          <div>
            <img
              className="profile-banner"
              src={user.profileImg ?? images.profileBanner}
              alt="profile-banner"
            />
          </div>

          <div className="profile-avatar">
            <img src={user.avatar ?? images.avatar} alt="avatar" />
          </div>
          <div className="profile-edit-options">
            {isOriginUser ? (
              <EditProfileButton />
            ) : (
              <FollowButton id={user.userId} user={user} />
            )}
          </div>
        </div>
        <div className="profile-bio">
          <h3 className="profile-name">{user.name}</h3>
          <p className="profile-slug">{user.userSlug}</p>
          {user.description && (
            <p className="profile-description">{user.description}</p>
          )}
          <div className="follow-panel">
            <div>
              <span>{user.following.length}</span>
              Following
            </div>
            <div>
              <span>{user.followers.length}</span>
              Followers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
