import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@components/Button/Button';
import { ErrorBlock } from '@components/ErrorBlock/ErrorBlock';
import { Input } from '@components/Input/Input';
import { images } from '@constants/images';
import { loginRequest } from '@store/actions/authActions';
import { RootState } from '@store/types';

import './styles.scss';

interface FormData {
  email: string;
  password: string;
}

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    dispatch(loginRequest(data.email, data.password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  return (
    <section className="sign-in-section">
      <div className="sign-in-form-container">
        <div className="sign-in-logo">
          <img src={images.logo} alt="logo" />
        </div>
        <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Phone number, email address"
            error={errors.email?.message}
            register={register}
            name="email"
            option={{
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Email must be a valid email address',
              },
            }}
          />
          <Input
            placeholder="Password"
            error={errors.password?.message}
            register={register}
            name="password"
            option={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            }}
          />
          <Button type="submit" disabled={loading} text="Log In" />
        </form>
        <div className="link-to-sign-up">
          <Link to={'/sign-up'}>Sign up to Twitter</Link>
        </div>
        {error && <ErrorBlock message={error} />}
      </div>
    </section>
  );
};
