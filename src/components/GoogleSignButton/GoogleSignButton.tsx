import { useDispatch } from 'react-redux';
import { images } from '@constants/images';
import {
  googleLoginRequest,
  googleLogupRequest,
} from '@store/actions/authActions';

export const GoogleSignButton = ({
  type,
  text,
}: {
  type: 'signin' | 'signup';
  text?: string;
}) => {
  const dispatch = useDispatch();
  const handleGoogleSignIn = () => {
    console.log(type);
    if (type === 'signin') {
      dispatch(googleLoginRequest());
    }
    if (type === 'signup') {
      dispatch(googleLogupRequest());
    }
  };
  return (
    <button onClick={handleGoogleSignIn} className="entry-btn">
      <img src={images.googleIcon} alt="google" />
      {text && <span>{text}</span>}
    </button>
  );
};
