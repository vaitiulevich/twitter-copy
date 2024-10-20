import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/Button/Button';
import { DateSelector } from '@components/DateSelector/DateSelector';
import { Input } from '@components/Input/Input';
import { images } from '@constants/images';
import { checkUserExists } from '@store/actions/authActions';

import './styles.scss';

interface FormData {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export const SignUp = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    const completeData = { ...data, selectedDate };
    dispatch(checkUserExists(completeData));
    navigate('set-password');
  };

  const handleDateChange = (month: string, day: string, year: string) => {
    setSelectedDate(`${year}-${month}-${day}`);
  };

  return (
    <section className="sign-up-section">
      <div className="sign-up-form-container">
        <div className="sign-up-logo">
          <img src={images.logo} alt="logo" />
        </div>
        <h2>Create an account</h2>
        <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Name"
            error={errors.name?.message}
            register={register}
            name={'name'}
            option={{
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
              maxLength: {
                value: 15,
                message: 'Name must be at most 15 characters',
              },
            }}
          />
          <Input
            placeholder="Phone number"
            error={errors.phone?.message}
            register={register}
            name={'phone'}
            option={{
              required: 'Phone number is required',
              pattern: {
                value: /^\+?[1-9]\d{1,12}$/,
                message: 'Phone number must be in international format',
              },
              minLength: {
                value: 2,
                message: 'Phone number must be at least 2 characters',
              },
              maxLength: {
                value: 12,
                message: 'Phone number must be at most 12 characters',
              },
            }}
          />
          <Input
            placeholder="Email"
            error={errors.email?.message}
            register={register}
            name={'email'}
            option={{
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Email must be a valid email address',
              },
            }}
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
            <DateSelector onDateChange={handleDateChange} />
          </div>

          <Button text="Next" type="submit" />
        </form>
        {error && <div>{error}</div>}
      </div>
    </section>
  );
};
