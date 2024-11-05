import { useSelector } from 'react-redux';
import { EditProfileButton } from '@components/EditProfileButton/EditProfileButton';
import { FollowButton } from '@components/FollowButton/FollowButton';
import { images } from '@constants/images';
import { UserState } from '@store/reducers/userReducer';
import { RootState } from '@store/types';

import './styles.scss';
export const ProfileHead = ({
  user,
  isOriginUser,
}: {
  user: UserState;
  isOriginUser: boolean;
}) => {
  let countPosts = useSelector((state: RootState) => state.posts.posts.length);
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
