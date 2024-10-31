import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AddPostPanel } from '@components/AddPostPanel/AddPostPanel';
import { Button } from '@components/Button/Button';
import { ExitAlert } from '@components/ExitAlert/ExitAlert';
import { UserShortInfo } from '@components/UserShortInfo/UserShortInfo';
import { NavMenu } from '@constants/constants';
import { images } from '@constants/images';
import withModal from '@HOC/withModal';
import { selectThemeType, selectUserSelector } from '@store/selectors';
import classNames from 'classnames';

import './styles.scss';

interface MenuSidebarProps {
  openModal: (content: ReactNode) => void;
  onCloseModal?: () => void;
}

export const MenuSidebar = withModal(
  ({ openModal, onCloseModal }: MenuSidebarProps) => {
    const location = useLocation();
    const handleOpenModal = () => {
      openModal(
        <AddPostPanel location="modal-tweet" onCloseModal={onCloseModal} />
      );
    };
    const handleOpenExitModal = () => {
      openModal(<ExitAlert />);
    };

    const theme = useSelector(selectThemeType);
    const { avatar, name, userSlug } = useSelector(selectUserSelector);

    const renderMenu = () => {
      return NavMenu.map((item) => {
        const isActive = location.pathname === item.link;
        return (
          <li className="nav-list-item" key={item.title}>
            <img
              src={theme === 'light' ? item.img : item.imgDark}
              alt={item.title}
            />
            <Link
              className={classNames('nav-list-item-link', { active: isActive })}
              to={item.link}
            >
              {item.title}
            </Link>
          </li>
        );
      });
    };
    const renderMobileMenu = () => {
      return NavMenu.map((item) => (
        <li className="nav-list-item" key={item.title}>
          <Link to={item.link}>
            <img
              src={theme === 'light' ? item.img : item.imgDark}
              alt={item.title}
            />
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
          <UserShortInfo avatar={avatar} name={name} userSlug={userSlug} />
          <Button
            text="Log Out"
            onClick={handleOpenExitModal}
            className="menu-sidebar-btn"
          />
        </div>
        <div className="mobile-menu-sidebar">
          <nav className="mobile-menu-nav">
            <ul className="nav-list">
              <li>
                <button
                  className="log-out-button"
                  onClick={handleOpenExitModal}
                >
                  <img src={images.logOutIcon} alt="log out" />
                </button>
              </li>
              {renderMobileMenu()}
            </ul>
          </nav>
        </div>
      </aside>
    );
  }
);
