import {
  DATE_BIRTH_LENGTH,
  MAX_LENTGH_DESCRIPTION,
  MAX_LENTGH_NAME,
  MAX_LENTGH_PASSWORD,
  MAX_LOGIN_LENTGH_PASSWORD,
  MIN_LENTGH_DESCRIPTION,
  MIN_LENTGH_NAME,
  MIN_LENTGH_PASSWORD,
  MIN_LOGIN_LENTGH_PASSWORD,
} from '@constants/constants';
import {
  ERR_INCORRECT_FILL,
  ERR_MAX_LENTGH_PASSWORD,
  ERR_MIN_LENTGH_PASSWORD,
  ERR_PASSWORD_CONFIRM,
  ERR_PASSWORD_CONTIN_NUM,
  ERR_PASSWORD_CONTIN_UPERCASE,
  ERR_PASSWORD_MATCH,
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

export const setPasswordValidationSchema = yup.object().shape({
  password: passwordValidation,
  repassword: yup
    .string()
    .oneOf([yup.ref('password')], ERR_PASSWORD_MATCH)
    .required(ERR_PASSWORD_CONFIRM),
});

export const editProfileValidationSchema = yup.object().shape({
  name: stringRequired(MIN_LENTGH_NAME, MAX_LENTGH_NAME),
  phone: phoneValidation,
  dateBirth: stringRequired(DATE_BIRTH_LENGTH, DATE_BIRTH_LENGTH),
  description: yup
    .string()
    .min(MIN_LENTGH_DESCRIPTION, ERR_INCORRECT_FILL)
    .max(MAX_LENTGH_DESCRIPTION, ERR_INCORRECT_FILL)
    .notRequired(),
});

export const signInValidationSchema = yup.object().shape({
  password: stringRequired(
    MIN_LOGIN_LENTGH_PASSWORD,
    MAX_LOGIN_LENTGH_PASSWORD
  ),
  isEmailLogin: yup.bool(),
  email: yup.string().when('isEmailLogin', {
    is: true,
    then: () => emailValidation,
  }),
  phone: yup.string().when('isEmailLogin', {
    is: false,
    then: () => phoneValidation,
  }),
});

export const signUpValidationSchema = yup.object().shape({
  name: stringRequired(MIN_LENTGH_NAME, MAX_LENTGH_NAME),
  phone: phoneValidation,
  email: emailValidation,
});
