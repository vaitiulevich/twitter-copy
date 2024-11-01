import { ReactNode, useCallback } from 'react';
import { AddPostPanel } from '@components/AddPostPanel/AddPostPanel';
import { ExitAlert } from '@components/ExitAlert/ExitAlert';
import { DesctopMenu } from '@components/MenuSidebar/components/DesctopMenu/DesctopMenu';
import { MobileMenu } from '@components/MenuSidebar/components/MobileMenu/MobileMenu';
import withModal from '@HOC/withModal';

import './styles.scss';

interface MenuSidebarProps {
  openModal: (content: ReactNode) => void;
  onCloseModal?: () => void;
}

export const MenuSidebar = withModal(
  ({ openModal, onCloseModal }: MenuSidebarProps) => {
    const handleOpenModal = useCallback(() => {
      openModal(
        <AddPostPanel location="modal-tweet" onCloseModal={onCloseModal} />
      );
    }, []);
    const handleOpenExitModal = useCallback(() => {
      openModal(<ExitAlert />);
    }, []);

    return (
      <aside className="menu-sidebar">
        <DesctopMenu
          handleOpenExitModal={handleOpenExitModal}
          handleOpenModal={handleOpenModal}
        />
        <MobileMenu handleOpenExitModal={handleOpenExitModal} />
      </aside>
    );
  }
);
