import { MouseEvent, ReactNode } from 'react';
import ReactDOM from 'react-dom';

import './styles.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;
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
