import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@components/Button/Button';
import { ControlledInput } from '@components/ControlledInput/ControlledInput';
import { ErrorBlock } from '@components/ErrorBlock/ErrorBlock';
import { images } from '@constants/images';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  registerRequest,
  resetAuthUser,
  resetError,
} from '@store/actions/authActions';
import { selectAuthLoad, selectAuthUser } from '@store/selectors';
import { setPasswordValidationSchema } from '@utils/validationSchemas';

import './styles.scss';
import { auth } from '../../../firebase';
interface FormData {
  password: string;
  repassword: string;
}

export const SetPassword = () => {
  const { control, handleSubmit } = useForm({
    mode: 'all',
    resolver: yupResolver(setPasswordValidationSchema),
  });
  const dispatch = useDispatch();
  const [isNotMatch, setIsNotMatch] = useState(false);
  const loading = useSelector(selectAuthLoad);
  const user = useSelector(selectAuthUser);

  const navigate = useNavigate();
  const logUser = auth.currentUser;

  const onSubmit = (data: FormData) => {
    if (data.password === data.repassword && user) {
      setIsNotMatch(false);
      dispatch(registerRequest({ ...user, password: data.password }));
    } else {
      setIsNotMatch(true);
    }
  };

  const handleToSignUp = () => {
    dispatch(resetError());
    dispatch(resetAuthUser());
  };

  useEffect(() => {
    if (!user) {
      navigate('/sign-up');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (logUser) {
      navigate('/profile');
    }
  }, [logUser]);
  return (
    <section className="set-password-section">
      <div className="set-password-form-container">
        <div className="set-password-logo">
          <img src={images.logo} alt="logo" />
        </div>
        <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
          <ControlledInput
            name="password"
            type="password"
            control={control}
            placeholder="Set Password"
          />
          <ControlledInput
            name="repassword"
            type="password"
            control={control}
            placeholder="Confirm password"
          />
          <Button
            loading={loading}
            type="submit"
            disabled={loading}
            text="Log Up"
          />
        </form>
        <div className="sign-up-link-block">
          <Link
            to={'/sign-up'}
            onClick={handleToSignUp}
            className="to-sign-up-link"
          >
            to sign up
          </Link>
        </div>
        {isNotMatch && <ErrorBlock message="Passwords do not match" />}
      </div>
    </section>
  );
};
