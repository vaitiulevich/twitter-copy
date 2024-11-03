import { Link } from 'react-router-dom';
import { images } from '@constants/images';

import './styles.scss';
export const UserShortInfo = ({
  avatar,
  name,
  userSlug,
  navTo,
}: {
  avatar?: string | null;
  name: string;
  userSlug?: string;
  navTo?: string;
}) => {
  return (
    <div>
      <div className="user-info-panel">
        <div className="user-info-img">
          <img src={avatar ?? images.avatar} alt="avatar" />
        </div>
        <div className="user-info">
          <h3 className="user-info-name">
            {navTo ? (
              <Link className="user-name-link" to={navTo}>
                {name}
              </Link>
            ) : (
              name
            )}
          </h3>
          {userSlug && <p className="user-info-slug">{userSlug} </p>}
        </div>
      </div>
    </div>
  );
};
