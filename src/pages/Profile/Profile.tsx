import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/Button/Button';
import { logoutRequest } from '@store/actions/authActions';

export const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const handleLogOut = () => {
    dispatch(logoutRequest());
    navigation('/sign-in');
  };

  return (
    <div>
      <Button onClick={handleLogOut} text="Log Out" />
    </div>
  );
};
