import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/Button/Button';
import { Input } from '@components/Input/Input';
import { images } from '@constants/images';
import { registerRequest } from '@store/actions/authActions';
import { RootState } from '@store/types';

import './styles.scss';

interface FormData {
  password: string;
  retpassword: string;
}

export const SetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const dispatch = useDispatch();
  const [isNotMatch, setIsNotMatch] = useState(false);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    if (data.password === data.retpassword && user) {
      setIsNotMatch(false);
      dispatch(registerRequest(user.email, user.phone, data.password));
      navigate('/profile');
    } else {
      setIsNotMatch(true);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/sign-up');
    } else if (isAuthenticated) {
      navigate('/profile');
    }
  }, [user, isAuthenticated, navigate]);

  const renderErrorMessage = () =>
    isNotMatch && <p className="no-match-error">Passwords are different</p>;

  return (
    <section className="set-password-section">
      <div className="set-password-form-container">
        <div className="set-password-logo">
          <img src={images.logo} alt="logo" />
        </div>
        <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Set Password"
            error={errors.password?.message}
            register={register}
            name="password"
            type="password"
            option={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            }}
          />
          <Input
            placeholder="Repeat password"
            error={errors.retpassword?.message}
            register={register}
            name="retpassword"
            type="password"
            option={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            }}
          />
          <Button type="submit" disabled={loading} text="Log Up" />
        </form>
        {renderErrorMessage()}
      </div>
    </section>
  );
};
