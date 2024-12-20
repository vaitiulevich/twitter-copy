import { useDispatch } from 'react-redux';
import { Button } from '@components/Button/Button';
import { logoutRequest } from '@store/actions/authActions';

import './styles.scss';

interface ExitAlertProps {
  onCloseModal?: () => void;
}
export const ExitAlert = ({ onCloseModal }: ExitAlertProps) => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logoutRequest());
  };
  return (
    <div className="exit-alert">
      <p>Are you sure you want to exit?</p>
      <div className="exit-alert-btns">
        <Button onClick={handleLogOut} text="Log Out" />
        <Button onClick={onCloseModal} text="Cancel" />
      </div>
    </div>
  );
};
