import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AddPostPanel } from '@components/AddPostPanel/AddPostPanel';
import { Button } from '@components/Button/Button';
import { images } from '@constants/images';
import { logoutRequest } from '@store/actions/authActions';
import { clearUserData } from '@store/actions/userActions';
import { RootState } from '@store/types';
import withModal from '@utils/HOC/withModal';

import './styles.scss';

const NavMenu = [
  {
    title: 'Home',
    link: '/home',
    img: images.home,
  },
  {
    title: 'Explore',
    link: '/home',
    img: images.explore,
  },
  {
    title: 'Notifications',
    link: '/home',
    img: images.notification,
  },
  {
    title: 'Messages',
    link: '/home',
    img: images.messages,
  },
  {
    title: 'Lists',
    link: '/home',
    img: images.lists,
  },
  {
    title: 'Profile',
    link: '/profile',
    img: images.profile,
  },
];
interface MenuSidebarProps {
  openModal: (content: ReactNode) => void;
}

export const MenuSidebar = withModal(({ openModal }: MenuSidebarProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const user = useSelector((state: RootState) => state.user);

  const handleLogOut = () => {
    dispatch(clearUserData());
    dispatch(logoutRequest());
    navigation('/sign-in');
  };
  const handleOpenModal = () => {
    openModal(<AddPostPanel />);
  };
  return (
    <aside className="menu-sidebar">
      <div>
        <div className="header-menu-sidebar">
          <img src={images.logo} alt="logo" />
        </div>
        <nav>
          <ul className="nav-list">
            {NavMenu.map((item) => (
              <li className="nav-list-item" key={item.title}>
                <img src={item.img} alt={item.title} />
                <Link to={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button
          text="Tweet"
          onClick={handleOpenModal}
          className="menu-sidebar-btn"
        />
      </div>
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
    </aside>
  );
});
