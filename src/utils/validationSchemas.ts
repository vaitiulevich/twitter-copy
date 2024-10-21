import { MAX_PHONE_LENGTH, MIN_PHONE_LENGTH } from '@constants/constants';
import { ERR_INCORRECT_FILL, ERR_REQUIRED } from '@constants/messages';
import * as yup from 'yup';

export const stringRequired = (min: number, max: number) =>
  yup
    .string()
    .required(ERR_REQUIRED)
    .min(min, ERR_INCORRECT_FILL)
    .max(max, ERR_INCORRECT_FILL);

export const phoneValidation = yup
  .string()
  .required(ERR_REQUIRED)
  .matches(/^\+?[1-9]\d{1,12}$/, ERR_INCORRECT_FILL)
  .min(MIN_PHONE_LENGTH, ERR_INCORRECT_FILL)
  .max(MAX_PHONE_LENGTH, ERR_INCORRECT_FILL);

export const emailValidation = yup
  .string()
  .required(ERR_REQUIRED)
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    ERR_INCORRECT_FILL
  )
  .email(ERR_INCORRECT_FILL);
