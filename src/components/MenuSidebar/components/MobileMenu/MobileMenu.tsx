import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { NavMenu } from '@constants/constants';
import { images } from '@constants/images';
import { RootState } from '@store/types';
import classNames from 'classnames';

import './styles.scss';

export const MobileMenu = memo(
  ({ handleOpenExitModal }: { handleOpenExitModal: () => void }) => {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const isLightTheme = theme === 'light';
    const location = useLocation();
    const renderMobileMenu = () => {
      return NavMenu.map((item) => {
        const isActive = location.pathname === item.link;
        return (
          <li className="nav-list-item" key={item.title}>
            <Link
              className={classNames('mobile-menu-item-link', {
                active: isActive,
              })}
              to={item.link}
            >
              <img
                src={isLightTheme ? item.img : item.imgDark}
                alt={item.title}
              />
            </Link>
          </li>
        );
      });
    };
    return (
      <div className="mobile-menu-sidebar">
        <nav className="mobile-menu-nav">
          <ul className="nav-list">
            <li>
              <button className="log-out-button" onClick={handleOpenExitModal}>
                <img src={images.logOutIcon} alt="log out" />
              </button>
            </li>
            {renderMobileMenu()}
          </ul>
        </nav>
      </div>
    );
  }
);
