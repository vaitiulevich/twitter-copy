import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@components/Button/Button';
import { ControlledInput } from '@components/ControlledInput/ControlledInput';
import { ErrorBlock } from '@components/ErrorBlock/ErrorBlock';
import { GoogleSignUpButton } from '@components/GoogleSignUpButton/GoogleSignUpButton';
import { images } from '@constants/images';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginRequest } from '@store/actions/authActions';
import { selectAuthError, selectAuthLoad } from '@store/selectors';
import {
  emailValidation,
  passwordValidation,
  phoneValidation,
} from '@utils/validationSchemas';
import * as yup from 'yup';

import './styles.scss';
import { auth } from '../../../firebase';

interface FormData {
  email: string;
  password: string;
}
const validationSchema = yup.object().shape({
  password: passwordValidation,
  email: emailValidation,
  phone: phoneValidation,
});
export const SignIn = () => {
  const { control, handleSubmit } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });
  const [isEmailLogin, setIsEmailLogin] = useState(true);
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoad);
  const error = useSelector(selectAuthError);
  const navigate = useNavigate();

  const toggleLiginType = () => {
    setIsEmailLogin(!isEmailLogin);
  };
  const onSubmit = (data: FormData) => {
    const loginType = isEmailLogin ? 'email' : 'phone';
    dispatch(loginRequest(loginType, data.email, data.password));
  };
  const logUser = auth.currentUser;
  useEffect(() => {
    if (logUser) {
      navigate('/profile');
    }
  }, [logUser]);
  return (
    <section className="sign-in-section">
      <div className="sign-in-form-container">
        <div className="sign-in-logo">
          <img src={images.logo} alt="logo" />
        </div>
        <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
          <ControlledInput
            type={isEmailLogin ? 'email' : 'phone'}
            name={isEmailLogin ? 'email' : 'phone'}
            control={control}
            placeholder={isEmailLogin ? 'Email address' : 'Phone number'}
          />
          <ControlledInput
            type="password"
            name="password"
            control={control}
            placeholder="Password"
          />

          <Button type="submit" disabled={loading} text="Log In" />
        </form>
        <div className="links-to-sign">
          <div className="sign-in-types">
            <GoogleSignUpButton />
            <button onClick={toggleLiginType} className="toggle-sign-in">
              {isEmailLogin
                ? 'Sign in with phone number'
                : 'Sign in with email address'}
            </button>
          </div>

          <Link to={'/sign-up'}>Sign up to Twitter</Link>
        </div>
        {error && <ErrorBlock message={error} />}
      </div>
    </section>
  );
};
