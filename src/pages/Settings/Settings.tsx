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

import './styles.scss';
interface FormData {
  password: string;
  newPassword: string;
}
export const Settings = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm({
    mode: 'all',
    resolver: yupResolver(chandgePasswordValidationSchema),
  });
  const onSubmit = (data: FormData) => {
    dispatch(changePasswordRequest(data.newPassword, data.password));
  };
  const error = useSelector(selectUserError);
  const status = useSelector(selectUserStatus);
  const loading = useSelector(selectUserLoad);

  return (
    <section className="settings">
      <h2 className="settings-headline">Profile settings</h2>
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
            placeholder="Set New password"
          />
          <Button
            loading={loading}
            type="submit"
            disabled={loading}
            text="Change password"
          />
        </form>
        {status !== null && <p className="succes-status">Access</p>}
        {error && <ErrorBlock message={error} />}
      </div>
    </section>
  );
};
