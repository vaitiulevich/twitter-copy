import { ReactNode } from 'react';
import { EditProfileForm } from '@components/EditProfileForm/EditProfileForm';
import withModal from '@HOC/withModal';

import './styles.scss';

interface EditButtonProps {
  openModal: (content: ReactNode) => void;
}

export const EditProfileButton = withModal(({ openModal }: EditButtonProps) => {
  const handleOpenModal = () => {
    openModal(<EditProfileForm />);
  };
  return (
    <div className="profile-edit-options">
      <button onClick={handleOpenModal} className="profile-edit-btn">
        Edit profile
      </button>
    </div>
  );
});
