import { ComponentType, ReactNode, useState } from 'react';
import { Modal } from '@components/Modal/Modal';

interface WithModalProps {
  openModal: (content: ReactNode) => void;
  onCloseModal: () => void;
}

const withModal = (WrappedComponent: ComponentType<WithModalProps>) => {
  const WithModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState<ReactNode>(null);

    const openModal = (content: ReactNode) => {
      setModalContent(content);
      setIsOpen(true);
    };

    const closeModal = () => {
      setIsOpen(false);
      setModalContent(null);
    };

    return (
      <>
        <WrappedComponent openModal={openModal} onCloseModal={closeModal} />
        <Modal isOpen={isOpen} onClose={closeModal}>
          {modalContent}
        </Modal>
      </>
    );
  };

  return WithModal;
};

export default withModal;
