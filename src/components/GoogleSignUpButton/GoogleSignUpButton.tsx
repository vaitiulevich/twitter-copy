import { useDispatch } from 'react-redux';
import { images } from '@constants/images';
import { googleLoginRequest } from '@store/actions/authActions';

export const GoogleSignUpButton = () => {
  const dispatch = useDispatch();
  const handleGoogleSignIn = () => {
    dispatch(googleLoginRequest());
  };
  return (
    <button onClick={handleGoogleSignIn} className="entry-btn">
      <img src={images.googleIcon} alt="google" />
      <span>Sign up with Google</span>
    </button>
  );
};
