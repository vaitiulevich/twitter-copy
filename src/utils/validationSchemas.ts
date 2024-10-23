import { MAX_LENTGH_PASSWORD, MIN_LENTGH_PASSWORD } from '@constants/constants';
import {
  ERR_INCORRECT_FILL,
  ERR_MAX_LENTGH_PASSWORD,
  ERR_MIN_LENTGH_PASSWORD,
  ERR_PASSWORD_CONTIN_NUM,
  ERR_PASSWORD_CONTIN_UPERCASE,
  ERR_REQUIRED,
} from '@constants/messages';
import * as yup from 'yup';

export const stringRequired = (min: number, max: number) =>
  yup
    .string()
    .required(ERR_REQUIRED)
    .min(min, ERR_INCORRECT_FILL)
    .max(max, ERR_INCORRECT_FILL);

export const phoneValidation = yup.string().required(ERR_REQUIRED);

export const passwordValidation = yup
  .string()
  .required(ERR_REQUIRED)
  .min(MIN_LENTGH_PASSWORD, ERR_MIN_LENTGH_PASSWORD)
  .max(MAX_LENTGH_PASSWORD, ERR_MAX_LENTGH_PASSWORD)
  .matches(/(?=.*[0-9])/, ERR_PASSWORD_CONTIN_NUM)
  .matches(/(?=.*[A-Z])/, ERR_PASSWORD_CONTIN_UPERCASE);

export const emailValidation = yup
  .string()
  .required(ERR_REQUIRED)
  .matches(/^[^\s]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, ERR_INCORRECT_FILL)
  .email(ERR_INCORRECT_FILL);
