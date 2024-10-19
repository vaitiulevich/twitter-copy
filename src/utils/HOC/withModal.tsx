import React, { ComponentType, ReactNode, useState } from 'react';
import { Modal } from '@components/Modal/Modal';

interface WithModalProps {
  openModal: (content: React.ReactNode) => void;
}

const withModal = <P extends object>(
  WrappedComponent: ComponentType<P & WithModalProps>
) => {
  const WithModal = (props: P) => {
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
        <WrappedComponent {...(props as P)} openModal={openModal} />
        <Modal isOpen={isOpen} onClose={closeModal}>
          {modalContent}
        </Modal>
      </>
    );
  };

  return WithModal;
};

export default withModal;
