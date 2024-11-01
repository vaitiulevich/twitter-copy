import { useDispatch } from 'react-redux';
import { images } from '@constants/images';
import { googleLogupRequest } from '@store/actions/authActions';

export const GoogleSignButton = ({ text }: { text?: string }) => {
  const dispatch = useDispatch();
  const handleGoogleSignIn = () => {
    dispatch(googleLogupRequest());
  };
  return (
    <button onClick={handleGoogleSignIn} className="entry-btn">
      <img src={images.googleIcon} alt="google" />
      {text && <span>{text}</span>}
    </button>
  );
};
