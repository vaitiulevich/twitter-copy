import { ReactNode, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddPostPanel } from '@components/AddPostPanel/AddPostPanel';
import { ExitAlert } from '@components/ExitAlert/ExitAlert';
import { DesctopMenu } from '@components/MenuSidebar/components/DesctopMenu/DesctopMenu';
import { MobileMenu } from '@components/MenuSidebar/components/MobileMenu/MobileMenu';
import { NotificationPopUp } from '@components/NotificationPopUp/NotificationPopUp';
import withModal from '@HOC/withModal';
import { logoutFailure } from '@store/actions/authActions';
import { hideErrorPopUp } from '@store/actions/popUpActions';
import { RootState } from '@store/types';

import './styles.scss';

interface MenuSidebarProps {
  openModal: (content: ReactNode) => void;
  onCloseModal?: () => void;
}

export const MenuSidebar = withModal(
  ({ openModal, onCloseModal }: MenuSidebarProps) => {
    const error = useSelector((state: RootState) => state.auth.error);
    const dispatch = useDispatch();
    const handleOpenModal = useCallback(() => {
      openModal(
        <AddPostPanel location="modal-tweet" onCloseModal={onCloseModal} />
      );
    }, []);
    const handleOpenExitModal = useCallback(() => {
      openModal(<ExitAlert />);
    }, []);
    const handleClose = () => {
      dispatch(hideErrorPopUp());
      dispatch(logoutFailure(null));
    };

    return (
      <aside className="menu-sidebar">
        <DesctopMenu
          handleOpenExitModal={handleOpenExitModal}
          handleOpenModal={handleOpenModal}
        />
        <MobileMenu handleOpenExitModal={handleOpenExitModal} />
        {error && <NotificationPopUp message={error} onClose={handleClose} />}
      </aside>
    );
  }
);
