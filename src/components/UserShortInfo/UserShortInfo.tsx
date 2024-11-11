import { Link } from 'react-router-dom';
import { images } from '@constants/images';

import './styles.scss';

interface UserShortInfoProps {
  avatar?: string | null;
  name: string;
  userSlug?: string;
  navTo?: string;
}
export const UserShortInfo = ({
  avatar,
  name,
  userSlug,
  navTo,
}: UserShortInfoProps) => {
  const displayAvatar = avatar ?? images.avatar;
  const displayName = navTo ? (
    <Link className="user-name-link" to={navTo}>
      {name}
    </Link>
  ) : (
    name
  );

  return (
    <div className="user-info-panel">
      <div className="user-info-img">
        <img src={displayAvatar} alt="avatar" />
      </div>
      <div className="user-info">
        <h3 title={name} className="user-info-name">
          {displayName}
        </h3>
        {userSlug && <p className="user-info-slug">{userSlug}</p>}
      </div>
    </div>
  );
};
