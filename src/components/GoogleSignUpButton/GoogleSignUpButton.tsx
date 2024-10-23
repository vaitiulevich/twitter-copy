import { useDispatch } from 'react-redux';
import { images } from '@constants/images';
import { googleLoginRequest } from '@store/actions/authActions';

export const GoogleSignUpButton = ({ text }: { text?: string }) => {
  const dispatch = useDispatch();
  const handleGoogleSignIn = () => {
    dispatch(googleLoginRequest());
  };
  return (
    <button onClick={handleGoogleSignIn} className="entry-btn">
      <img src={images.googleIcon} alt="google" />
      {text && <span>{text}</span>}
    </button>
  );
};
