import {
  COUNT_MAX_DATE_BIRTH_YEARS,
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
  ERR_DATE_MIN_BIRTH,
  ERR_INCORRECT_FILL,
  ERR_MAX_LENTGH_NAME,
  ERR_MIN_LENTGH_NAME,
  ERR_PASSWORD_CONFIRM,
  ERR_PASSWORD_MATCH,
  ERR_PASSWORD_RULES,
  ERR_REQUIRED,
} from '@constants/messages';
import { DATE_REGEX, EMAIL_REGEX, PASSWORD_REGEX } from '@constants/regex';
import * as yup from 'yup';

export const stringRequired = (min: number, max: number) =>
  yup
    .string()
    .required(ERR_REQUIRED)
    .min(min, ERR_MIN_LENTGH_NAME)
    .max(max, ERR_MAX_LENTGH_NAME);

export const phoneValidation = yup.string().required(ERR_REQUIRED);

export const passwordValidation = yup
  .string()
  .required(ERR_REQUIRED)
  .min(MIN_LENTGH_PASSWORD, ERR_PASSWORD_RULES)
  .max(MAX_LENTGH_PASSWORD, ERR_PASSWORD_RULES)
  .matches(PASSWORD_REGEX, ERR_PASSWORD_RULES);

export const emailValidation = yup
  .string()
  .required(ERR_REQUIRED)
  .matches(EMAIL_REGEX, ERR_INCORRECT_FILL)
  .email(ERR_INCORRECT_FILL);

export const setPasswordValidationSchema = yup.object().shape({
  password: passwordValidation,
  repassword: yup
    .string()
    .oneOf([yup.ref('password')], ERR_PASSWORD_MATCH)
    .required(ERR_PASSWORD_CONFIRM),
});

export const changePasswordValidationSchema = yup.object().shape({
  password: stringRequired(
    MIN_LOGIN_LENTGH_PASSWORD,
    MAX_LOGIN_LENTGH_PASSWORD
  ),
  newPassword: passwordValidation,
});

const todayDate = new Date();
const todayYear = todayDate.getFullYear();
const minDateBirt = todayYear - COUNT_MAX_DATE_BIRTH_YEARS;

export const editProfileValidationSchema = yup.object().shape({
  name: stringRequired(MIN_LENTGH_NAME, MAX_LENTGH_NAME),
  phone: phoneValidation,
  dateBirth: yup
    .string()
    .required(ERR_REQUIRED)
    .matches(DATE_REGEX)
    .test('is-valid-date', ERR_DATE_MIN_BIRTH, (value) => {
      if (!value) return false;
      const year = parseInt(value.slice(0, 4), 10);
      return year >= minDateBirt && year <= todayYear;
    }),
  description: yup
    .string()
    .min(MIN_LENTGH_DESCRIPTION, ERR_INCORRECT_FILL)
    .max(MAX_LENTGH_DESCRIPTION, ERR_INCORRECT_FILL)
    .notRequired(),
});

export const signInValidationSchema = yup.object().shape({
  password: yup.string().required(ERR_REQUIRED),
  isEmailLogin: yup.bool(),
  email: yup.string().when('$isEmailLogin', {
    is: true,
    then: () => emailValidation,
  }),
  phone: yup.string().when('$isEmailLogin', {
    is: false,
    then: () => phoneValidation,
  }),
});

export const signUpValidationSchema = yup.object().shape({
  name: stringRequired(MIN_LENTGH_NAME, MAX_LENTGH_NAME),
  phone: phoneValidation,
  email: emailValidation,
});
