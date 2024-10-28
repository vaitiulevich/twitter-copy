import { ReactNode } from 'react';
import { EditProfileForm } from '@components/EditProfileForm/EditProfileForm';
import withModal from '@HOC/withModal';

import './styles.scss';

interface EditButtonProps {
  openModal: (content: ReactNode) => void;
  onCloseModal: () => void;
}

export const EditProfileButton = withModal(
  ({ openModal, onCloseModal }: EditButtonProps) => {
    const handleOpenModal = () => {
      openModal(<EditProfileForm onCloseModal={onCloseModal} />);
    };
    return (
      <button onClick={handleOpenModal} className="profile-edit-btn">
        Edit profile
      </button>
    );
  }
);
