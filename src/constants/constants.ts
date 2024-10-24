import { images } from '@constants/images';

export const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const DEFAULT_MONTH = 'Month';
export const DEFAULT_DAY = 'Day';
export const DEFAULT_YEAR = 'Year';
export const YEAR_RANGE = 100;
export const DEFAULT_COUNT_DAYS_IN_MONTH = 30;

const COUNT_SESSION_HOUR = 24;
export const sessionPeriod = COUNT_SESSION_HOUR * 60 * 60 * 1000;

export const FooterLinks = [
  { title: 'About', link: '/about' },
  { title: 'Help Center', link: '/help' },
  { title: 'Terms of Service', link: '/terms' },
  { title: 'Privacy Policy', link: '/privacy' },
  { title: 'Cookie Policy', link: '/cookie' },
  { title: 'Ads info', link: '/ads' },
  { title: 'Blog', link: '/blog' },
  { title: 'Status', link: '/status' },
  { title: 'Carrres', link: '/carres' },
  { title: 'Brand Resources', link: '/brand' },
  { title: 'Advertsing', link: '/advert' },
  { title: 'Marketing', link: '/marketing' },
  { title: 'Twitter for Business', link: '/business' },
  { title: 'Developers', link: '/dev' },
  { title: 'Directory', link: '/dir' },
  { title: 'Settings', link: '/settings' },
];
export const NavMenu = [
  {
    title: 'Home',
    link: '/home',
    img: images.home,
  },
  {
    title: 'Explore',
    link: '/home',
    img: images.explore,
  },
  {
    title: 'Notifications',
    link: '/home',
    img: images.notification,
  },
  {
    title: 'Messages',
    link: '/home',
    img: images.messages,
  },
  {
    title: 'Lists',
    link: '/home',
    img: images.lists,
  },
  {
    title: 'Profile',
    link: '/profile',
    img: images.profile,
  },
];

export const MAX_PHONE_LENGTH = 12;
export const MIN_PHONE_LENGTH = 6;
export const PHONE_MASK_LENGTH = 15;

export const MIN_LENTGH_PASSWORD = 8;
export const MAX_LENTGH_PASSWORD = 20;

export const MIN_LENTGH_DESCRIPTION = 1;
export const MAX_LENTGH_DESCRIPTION = 300;

export const MIN_LOGIN_LENTGH_PASSWORD = 1;
export const MAX_LOGIN_LENTGH_PASSWORD = 20;

export const MIN_LENTGH_NAME = 2;
export const MAX_LENTGH_NAME = 30;

export const DEFAULT_POST_FILES = 1;
export const MAX_POST_FILES = 4;
export const DATE_BIRTH_LENGTH = 10;

export const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10];
export const jpgSignature = [255, 216];
