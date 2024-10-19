import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { images } from '@constants/images';
import { googleLoginRequest } from '@store/actions/authActions';
import { RootState } from '@store/types';

export const GoogleSignUpButton = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    dispatch(googleLoginRequest());
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated]);
  return (
    <button onClick={handleGoogleSignIn} className="entry-btn">
      <img src={images.googleIcon} alt="google" />
      <span>Sign up with Google</span>
    </button>
  );
};
