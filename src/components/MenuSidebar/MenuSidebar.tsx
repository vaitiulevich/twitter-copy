import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AddPostPanel } from '@components/AddPostPanel/AddPostPanel';
import { Button } from '@components/Button/Button';
import { UserShortInfo } from '@components/UserShortInfo/UserShortInfo';
import { NavMenu } from '@constants/constants';
import { images } from '@constants/images';
import withModal from '@HOC/withModal';
import { logoutRequest } from '@store/actions/authActions';

import './styles.scss';

interface MenuSidebarProps {
  openModal: (content: ReactNode) => void;
}

export const MenuSidebar = withModal(({ openModal }: MenuSidebarProps) => {
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    openModal(<AddPostPanel />);
  };
  const handleLogOut = () => {
    dispatch(logoutRequest());
  };
  const renderMenu = () => {
    return NavMenu.map((item) => (
      <li className="nav-list-item" key={item.title}>
        <img src={item.img} alt={item.title} />
        <Link to={item.link}>{item.title}</Link>
      </li>
    ));
  };
  const renderMobileMenu = () => {
    return NavMenu.map((item) => (
      <li className="nav-list-item" key={item.title}>
        <Link to={item.link}>
          <img src={item.img} alt={item.title} />
        </Link>
      </li>
    ));
  };
  return (
    <aside className="menu-sidebar">
      <div className="desctop-menu-sidebar">
        <div>
          <div className="header-menu-sidebar">
            <img src={images.logo} alt="logo" />
          </div>
          <nav>
            <ul className="nav-list">{renderMenu()}</ul>
          </nav>
          <Button
            text="Tweet"
            onClick={handleOpenModal}
            className="menu-sidebar-btn"
          />
        </div>
        <UserShortInfo />
      </div>
      <div className="mobile-menu-sidebar">
        <nav className="mobile-menu-nav">
          <ul className="nav-list">
            <li>
              <button className="log-out-button" onClick={handleLogOut}>
                <img src={images.logOutIcon} alt="log out" />
              </button>
            </li>
            {renderMobileMenu()}
          </ul>
        </nav>
      </div>
    </aside>
  );
});
