import { useSelector } from 'react-redux';
import { images } from '@constants/images';
import { selectUserPosts, selectUserSelector } from '@store/selectors';

import './styles.scss';
export const ProfileHead = () => {
  const user = useSelector(selectUserSelector);
  const posts = useSelector(selectUserPosts);

  return (
    <div>
      <header className="profile-header">
        <h3>{user.name}</h3>
        <p>{posts.length} Tweets</p>
      </header>
      <div className="profile-hero-panel">
        <div className="profile-hero">
          <img
            className="profile-banner"
            src={user.profileImg ?? images.profileBanner}
            alt="profile-banner"
          />
          <div className="profile-avatar">
            <img src={user.avatar ?? images.avatar} alt="avatar" />
          </div>
          <div className="profile-edit-options">
            <button className="profile-edit-btn">Edit profile</button>
          </div>
        </div>
        <div className="profile-bio">
          <h3 className="profile-name">{user.name}</h3>
          <p className="profile-slug">{user.userSlug}</p>
          {user.description && <p>{user.description}</p>}
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
