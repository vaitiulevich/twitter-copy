import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '@components/Button/Button';
import { ControlledInput } from '@components/ControlledInput/ControlledInput';
import { DateSelector } from '@components/DateSelector/DateSelector';
import { ErrorBlock } from '@components/ErrorBlock/ErrorBlock';
import { images } from '@constants/images';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkUserExists, resetUserExist } from '@store/actions/authActions';
import { selectAuthError, selectAuthLoad } from '@store/selectors';
import { RootState } from '@store/types';
import {
  emailValidation,
  phoneValidation,
  stringRequired,
} from '@utils/validationSchemas';
import * as yup from 'yup';

import './styles.scss';

interface FormData {
  name: string;
  phone: string;
  email: string;
  password?: string;
}
const validationSchema = yup.object().shape({
  name: stringRequired(2, 15),
  phone: phoneValidation,
  email: emailValidation,
});

export const SignUp = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });
  const loading = useSelector(selectAuthLoad);
  const error = useSelector(selectAuthError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    const completeData = { ...data, dateBirth: selectedDate };
    console.log(selectedDate);
    console.log(completeData);
    if (selectedDate) {
      dispatch(checkUserExists(completeData));
    }
  };

  const selectAuthExist = useSelector(
    (state: RootState) => state.auth.navigateToSetPassword
  );

  useEffect(() => {
    if (selectAuthExist) {
      navigate('set-password');
      dispatch(resetUserExist());
    }
  }, [selectAuthExist]);

  const handleDateChange = (month: string, day: string, year: string) => {
    setSelectedDate(`${year}-${month}-${day}`);
  };
  return (
    <section className="sign-up-section">
      <div className="sign-up-form-container">
        <div className="sign-up-logo">
          <img src={images.logo} alt="logo" />
        </div>
        <div className="sign-up-header">
          <h2>Create an account</h2>
          <Link to={'/'} className="to-entry-link">
            to entry
          </Link>
        </div>
        <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
          <ControlledInput name="name" control={control} placeholder="Name" />
          <ControlledInput
            name="phone"
            type="phone"
            control={control}
            placeholder="Phone number"
          />
          <ControlledInput
            type="email"
            name="email"
            control={control}
            placeholder="Email"
          />
          <div>
            <h3>Date of birth</h3>
            <p className="date-panel-info">
              Facilisi sem pulvinar velit nunc, gravida scelerisque amet nibh
              sit. Quis bibendum ante phasellus metus, magna lacinia sed augue.
              Odio enim nascetur leo mauris vel eget. Pretium id ullamcorper
              blandit viverra dignissim eget tellus. Nibh mi massa in molestie a
              sit. Elit congue.
            </p>
            <DateSelector onDateChange={handleDateChange} isRequired={true} />
          </div>

          <Button
            disabled={loading || !isValid || !!!selectedDate}
            text={loading ? 'Check user...' : 'Next'}
            type="submit"
          />
        </form>
        {error && <ErrorBlock message={error} />}
      </div>
    </section>
  );
};
