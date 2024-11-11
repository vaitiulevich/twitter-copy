import { useSelector } from 'react-redux';
import { EditProfileButton } from '@components/EditProfileButton/EditProfileButton';
import { FollowButton } from '@components/FollowButton/FollowButton';
import { images } from '@constants/images';
import { UserState } from '@store/reducers/userReducer';
import { selectPostsLength } from '@store/selectors';

import './styles.scss';

interface ProfileHeadProps {
  user: UserState;
  isOriginUser: boolean;
}
export const ProfileHead = ({ user, isOriginUser }: ProfileHeadProps) => {
  const {
    name,
    profileImg,
    avatar,
    userId,
    userSlug,
    description,
    followers = [],
    following = [],
  } = user;
  let countPosts = useSelector(selectPostsLength);
  return (
    <div>
      <header className="profile-header">
        <h3 title={name}>{name}</h3>
        <p>{countPosts} Tweets</p>
      </header>
      <div className="profile-hero-panel">
        <div className="profile-hero">
          <div>
            <img
              className="profile-banner"
              src={profileImg ?? images.profileBanner}
              alt="profile-banner"
            />
          </div>

          <div className="profile-avatar">
            <img src={avatar ?? images.avatar} alt="avatar" />
          </div>
          <div className="profile-edit-options">
            {isOriginUser ? (
              <EditProfileButton />
            ) : (
              <FollowButton id={userId} user={user} />
            )}
          </div>
        </div>
        <div className="profile-bio">
          <h3 className="profile-name" title={name}>
            {name}
          </h3>
          <p className="profile-slug">{userSlug}</p>
          {description && <p className="profile-description">{description}</p>}
          <div className="follow-panel">
            <div>
              <span>{following.length}</span>
              Following
            </div>
            <div>
              <span>{followers.length}</span>
              Followers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
