import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@components/Button/Button';
import { ControlledInput } from '@components/ControlledInput/ControlledInput';
import { Input } from '@components/Input/Input';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '@constants/constants';
import { images } from '@constants/images';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginRequest } from '@store/actions/authActions';
import {
  selectAuthError,
  selectAuthLoad,
  selectAuthUser,
} from '@store/selectors';
import { RootState } from '@store/types';
import { emailValidation, stringRequired } from '@utils/validationSchemas';
import * as yup from 'yup';

import './styles.scss';
import { auth } from '../../../firebase';

interface FormData {
  email: string;
  password: string;
}
const validationSchema = yup.object().shape({
  password: stringRequired(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH),
  email: emailValidation,
});
export const SignIn = () => {
  const { control, handleSubmit } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoad);
  const error = useSelector(selectAuthError);
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    dispatch(loginRequest(data.email, data.password));
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
            type="email"
            name="email"
            control={control}
            placeholder="Phone number, email address"
          />
          <ControlledInput
            type="password"
            name="password"
            control={control}
            placeholder="Password"
          />

          <Button type="submit" disabled={loading} text="Log In" />
        </form>
        {error && <p className="sign-in-error">{error}</p>}
        <div className="link-to-sign-up">
          <Link to={'/sign-up'}>Sign up to Twitter</Link>
        </div>
      </div>
    </section>
  );
};
