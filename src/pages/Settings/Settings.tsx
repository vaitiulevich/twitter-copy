import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@components/Button/Button';
import { ControlledInput } from '@components/ControlledInput/ControlledInput';
import { ErrorBlock } from '@components/ErrorBlock/ErrorBlock';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePasswordRequest } from '@store/actions/userActions';
import {
  selectUserError,
  selectUserLoad,
  selectUserStatus,
} from '@store/selectors';
import { chandgePasswordValidationSchema } from '@utils/validationSchemas';
import { onAuthStateChanged } from 'firebase/auth';

import './styles.scss';
import { auth } from '../../firebase';

interface FormData {
  password: string;
  newPassword: string;
}

export const Settings = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(chandgePasswordValidationSchema),
  });
  const [isGoogleAuth, setIsGoogleAuth] = useState<boolean | null>(null);
  const error = useSelector(selectUserError);
  const status = useSelector(selectUserStatus);
  const loading = useSelector(selectUserLoad);

  const onSubmit = (data: FormData) => {
    dispatch(changePasswordRequest(data.newPassword, data.password));
    if (status) {
      reset();
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const googleAuth = currentUser.providerData.some(
          (provider) => provider.providerId === 'google.com'
        );
        setIsGoogleAuth(googleAuth);
      } else {
        setIsGoogleAuth(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="settings">
      <h2 className="settings-headline">Profile settings</h2>
      {isGoogleAuth === false && (
        <div className="change-password">
          <h3>Change user password</h3>
          <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
            <ControlledInput
              name="password"
              type="password"
              control={control}
              placeholder="Set Old Password"
            />
            <ControlledInput
              name="newPassword"
              type="password"
              control={control}
              placeholder="Set New Password"
            />
            <Button
              loading={loading}
              type="submit"
              disabled={loading}
              text="Change password"
            />
          </form>
          {status !== null && (
            <p className="success-status">Password changed successfully</p>
          )}
          {error && <ErrorBlock message={error} />}
        </div>
      )}
      {isGoogleAuth === true && (
        <p className="google-auth-mess">
          You logged in with Google. Password change is not available.
        </p>
      )}
    </section>
  );
};
