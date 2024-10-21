import { ChangeEvent, forwardRef, useState } from 'react';
import { FieldError, FieldValues, Path } from 'react-hook-form';
import { images } from '@constants/images';
import classNames from 'classnames';

import './styles.scss';

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  error?: FieldError;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps<FieldValues>>(
  ({ placeholder, error, type = 'text', value = '', onChange }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

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

    const inputType =
      type === 'password' && !showPassword ? 'password' : 'text';

    return (
      <div className="inp-panel">
        <div className={classNames('inp-block', { 'inp-block-err': error })}>
          <input
            ref={ref}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            type={inputType}
            className="inp"
          />
          {type === 'password' && renderPasswordToggle()}
        </div>
        {error && <p className="inp-err-message">{error.message}</p>}
      </div>
    );
  }
);
