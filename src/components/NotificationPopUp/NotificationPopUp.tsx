import { memo, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './styles.scss';

interface ErrorPopUpProps {
  message: string;
  onClose: () => void;
}
export const NotificationPopUp = memo(
  ({ message, onClose }: ErrorPopUpProps) => {
    useEffect(() => {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }, [onClose]);

    return ReactDOM.createPortal(
      <div className="error-popup">{message}</div>,
      document.getElementById('popup-root')!
    );
  }
);
