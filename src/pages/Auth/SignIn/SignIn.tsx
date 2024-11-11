import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@components/Button/Button';
import { ControlledInput } from '@components/ControlledInput/ControlledInput';
import { ErrorBlock } from '@components/ErrorBlock/ErrorBlock';
import { GoogleSignButton } from '@components/GoogleSignButton/GoogleSignButton';
import { images } from '@constants/images';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginRequest, resetError } from '@store/actions/authActions';
import {
  selectAuthError,
  selectAuthLoad,
  selectUserId,
} from '@store/selectors';
import { signInValidationSchema } from '@utils/validationSchemas';

import './styles.scss';
import { auth } from '../../../firebase';

interface FormData {
  email?: string;
  password: string;
  phone?: string;
}

export const SignIn = () => {
  const [isEmailLogin, setIsEmailLogin] = useState(true);
  const { control, handleSubmit, reset } = useForm<FormData>({
    mode: 'all',
    resolver: yupResolver(signInValidationSchema),
    context: { isEmailLogin },
  });
  const dispatch = useDispatch();
  const logUser = auth.currentUser;
  const user = useSelector(selectUserId);
  const loading = useSelector(selectAuthLoad);
  const error = useSelector(selectAuthError);
  const navigate = useNavigate();

  const loginType = isEmailLogin ? 'email' : 'phone';
  const placeholderText = isEmailLogin ? 'Email address' : 'Phone number';
  const toggleButtonText = isEmailLogin
    ? 'Sign in with phone number'
    : 'Sign in with email address';

  const toggleLoginType = () => {
    dispatch(resetError());
    setIsEmailLogin(!isEmailLogin);
    reset();
  };

  const onSubmit = (data: FormData) => {
    dispatch(resetError());
    const loginData = isEmailLogin ? data.email : data.phone;
    dispatch(loginRequest(loginType, loginData as string, data.password));
  };

  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, []);

  useEffect(() => {
    if (logUser) {
      dispatch(resetError());
      navigate('/profile');
    }
  }, [logUser, user]);

  return (
    <section className="sign-in-section">
      <div className="sign-in-form-container">
        <div className="sign-in-logo">
          <img src={images.logo} alt="logo" />
        </div>
        <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
          <ControlledInput
            type={loginType}
            name={loginType}
            control={control}
            placeholder={placeholderText}
          />
          <ControlledInput
            type="password"
            name="password"
            control={control}
            placeholder="Password"
          />

          <Button
            loading={loading}
            type="submit"
            disabled={loading}
            text="Log In"
          />
        </form>
        <div className="links-to-sign">
          <div className="sign-in-types">
            <GoogleSignButton />
            <button onClick={toggleLoginType} className="toggle-sign-in">
              {toggleButtonText}
            </button>
          </div>

          <Link to={'/sign-up'}>Sign up to Twitter</Link>
        </div>
        {error && <ErrorBlock message={error} />}
      </div>
    </section>
  );
};
