import {
  MAX_LENTGH_NAME,
  MAX_LENTGH_PASSWORD,
  MAX_POST_FILES,
  MIN_LENTGH_NAME,
  MIN_LENTGH_PASSWORD,
} from './constants';

export const ERR_REQUIRED = 'Required field';
export const ERR_INCORRECT_FILL = 'The field is filled in incorrectly';
export const USER_ALREDY_EXIST = 'User alredy exist';
export const INCORRECT_CREDS =
  'Incorrect login/password entry or such user does not exist';
export const ERR_COUNT_FILES = `Can contain a maximum:`;
export const ERR_INVALID_FILE = 'The file is not a PNG or JPG image.';
export const ERR_INVALID_SIZE = 'invalid size (ok:5mb)';
export const ERR_INVALID_DIMENSIONS = 'invalid demensions';

export const ERR_BOUNDARY_MESS = 'Something went wrong';

export const ERR_PASSWORD_RULES =
  'Password must contain more than 8 characters,one uppercase and number';

export const ERR_MIN_LENTGH_PASSWORD = `Minimum number of characters in a password ${MIN_LENTGH_PASSWORD}`;
export const ERR_MAX_LENTGH_PASSWORD = `Maximum number of characters in a password ${MAX_LENTGH_PASSWORD}`;

export const ERR_MIN_LENTGH_NAME = `Minimum number of characters in a name ${MIN_LENTGH_NAME}`;
export const ERR_MAX_LENTGH_NAME = `Maximum number of characters in a name ${MAX_LENTGH_NAME}`;

export const ERR_PASSWORD_CONTIN_NUM = 'Must contain a number';
export const ERR_PASSWORD_CONTIN_UPERCASE = 'Must contain a capital letter';

export const ERR_PASSWORD_MATCH = 'Passwords must match';
export const ERR_PASSWORD_CONFIRM = 'Please confirm your password';
