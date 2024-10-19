import { useState } from 'react';
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { images } from '@constants/images';
import { resetError } from '@store/actions/authActions';
import classNames from 'classnames';

import './styles.scss';

interface InputProps<T extends FieldValues> {
  register?: UseFormRegister<T>;
  name: Path<T>;
  placeholder?: string;
  error?: string;
  type?: string;
  option?: RegisterOptions<T>;
}

export const Input = <T extends FieldValues>({
  register,
  name,
  placeholder,
  error,
  type = 'text',
  option,
}: InputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const renderPasswordToggle = () => (
    <button
      type="button"
      className="toggle-visibility-btn"
      onClick={handleTogglePasswordVisibility}
    >
      <img
        src={showPassword ? images.visible : images.unvisible}
        className="toggle-visibility-img"
        alt="Toggle visibility"
      />
    </button>
  );

  const handaleResetError = () => {
    dispatch(resetError());
  };

  const inputType = type === 'password' && !showPassword ? 'password' : 'text';
  return (
    <div className="inp-panel">
      <div className={classNames('inp-block', { 'inp-block-err': error })}>
        <input
          {...(register ? register(name, option) : {})}
          placeholder={placeholder}
          onChange={handaleResetError}
          type={inputType}
          className="inp"
        />
        {type === 'password' && renderPasswordToggle()}
      </div>
      {error && <p className="inp-err-message">{error}</p>}
    </div>
  );
};
