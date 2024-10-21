import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@components/Button/Button';
import { images } from '@constants/images';
import { logoutRequest } from '@store/actions/authActions';
import { selectUserSelector } from '@store/selectors';

import './styles.scss';
export const UserShortInfo = () => {
  const user = useSelector(selectUserSelector);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logoutRequest());
  };
  return (
    <div>
      <div className="user-info-panel">
        <div className="user-info-img">
          <img src={user.avatar ?? images.avatar} alt="avatar" />
        </div>
        <div className="user-info">
          <h3 className="user-info-name">{user.name}</h3>
          <p className="user-info-slug">{user.userSlug} </p>
        </div>
      </div>
      <Button
        text="Log Out"
        onClick={handleLogOut}
        className="menu-sidebar-btn"
      />
    </div>
  );
};
