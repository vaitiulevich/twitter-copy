import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@components/Button/Button';
import { UserShortInfo } from '@components/UserShortInfo/UserShortInfo';
import { NavMenu } from '@constants/constants';
import { images } from '@constants/images';
import { RootState } from '@store/types';
import classNames from 'classnames';

import './styles.scss';

export const DesctopMenu = memo(
  ({
    handleOpenExitModal,
    handleOpenModal,
  }: {
    handleOpenExitModal: () => void;
    handleOpenModal: () => void;
  }) => {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const isLightTheme = theme === 'light';

    const { avatar, name, userSlug } = useSelector(
      (state: RootState) => state.user
    );

    const renderMenu = () => {
      return NavMenu.map((item) => {
        const isActive = location.pathname === item.link;
        return (
          <li className="nav-list-item" key={item.title}>
            <img
              src={isLightTheme ? item.img : item.imgDark}
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
    return (
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
    );
  }
);
