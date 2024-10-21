import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AddPostPanel } from '@components/AddPostPanel/AddPostPanel';
import { Button } from '@components/Button/Button';
import { UserShortInfo } from '@components/UserShortInfo/UserShortInfo';
import { NavMenu } from '@constants/constants';
import { images } from '@constants/images';
import withModal from '@HOC/withModal';

import './styles.scss';

interface MenuSidebarProps {
  openModal: (content: ReactNode) => void;
}

export const MenuSidebar = withModal(({ openModal }: MenuSidebarProps) => {
  const handleOpenModal = () => {
    openModal(<AddPostPanel />);
  };
  const renderMenu = () => {
    return NavMenu.map((item) => (
      <li className="nav-list-item" key={item.title}>
        <img src={item.img} alt={item.title} />
        <Link to={item.link}>{item.title}</Link>
      </li>
    ));
  };
  return (
    <aside className="menu-sidebar">
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
    </aside>
  );
});
