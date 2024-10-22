import { MAX_POST_FILES } from './constants';

export const ERR_REQUIRED = 'Required field';
export const ERR_INCORRECT_FILL = 'The field is filled in incorrectly';
export const USER_ALREDY_EXIST = 'User alredy exist';
export const INCORRECT_CREDS =
  'Incorrect login/password entry or such user does not exist';
export const ERR_COUNT_POST_FILES = `A tweet can contain a maximum of ${MAX_POST_FILES} images.`;
export const ERR_INVALID_FILE = 'The file is not a PNG or JPG image.';
