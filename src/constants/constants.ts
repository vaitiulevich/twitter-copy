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

const COUNT_SESSION_HOUR = 24;
export const sessionPeriod = COUNT_SESSION_HOUR * 60 * 60 * 1000;

export const FooterLinks = [
  { title: 'About', link: '/' },
  { title: 'Help Center', link: '/' },
  { title: 'Terms of Service', link: '/' },
  { title: 'Privacy Policy', link: '/' },
  { title: 'Cookie Policy', link: '/' },
  { title: 'Ads info', link: '/' },
  { title: 'Blog', link: '/' },
  { title: 'Status', link: '/' },
  { title: 'Carrres', link: '/' },
  { title: 'Brand Resources', link: '/' },
  { title: 'Advertsing', link: '/' },
  { title: 'Marketing', link: '/' },
  { title: 'Twitter for Business', link: '/' },
  { title: 'Developers', link: '/' },
  { title: 'Directory', link: '/' },
  { title: 'Settings', link: '/' },
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

export const MIN_PASSWORD_LENGTH = 2;
export const MAX_PASSWORD_LENGTH = 15;
