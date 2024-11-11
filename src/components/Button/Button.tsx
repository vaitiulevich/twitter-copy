import { memo, MouseEvent, MouseEventHandler } from 'react';
import { LOADING } from '@constants/messages';
import classNames from 'classnames';

import './styles.scss';

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  text: string;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
};

export const Button = memo(
  ({
    onClick,
    type = 'button',
    text,
    loading = false,
    className = '',
    disabled = false,
  }: ButtonProps) => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(event);
      }
    };

    return (
      <button
        type={type}
        onClick={handleClick}
        className={classNames('btn', className)}
        disabled={disabled}
      >
        {loading ? LOADING : text}
      </button>
    );
  }
);
