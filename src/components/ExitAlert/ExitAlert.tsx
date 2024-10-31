import { useDispatch } from 'react-redux';
import { Button } from '@components/Button/Button';
import { logoutRequest } from '@store/actions/authActions';

import './styles.scss';
export const ExitAlert = () => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logoutRequest());
  };
  return (
    <div>
      <p>Are you sure you want to exit?</p>
      <Button onClick={handleLogOut} text="Log Out" />
    </div>
  );
};
