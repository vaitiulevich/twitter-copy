import { MouseEvent, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './styles.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-close">
          <button className="modal-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};
