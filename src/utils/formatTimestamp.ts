import {
  SECONDS_IN_DAY,
  SECONDS_IN_HOUR,
  SECONDS_IN_MINUTE,
} from '@constants/constants';

export const formatTimestamp = (timestamp: number) => {
  const now = Date.now();
  const postDate = new Date(timestamp);
  const diffInSeconds = Math.floor((now - postDate.getTime()) / 1000);

  if (diffInSeconds < SECONDS_IN_MINUTE) {
    return 'Just now';
  } else if (diffInSeconds < SECONDS_IN_HOUR) {
    const minutes = Math.floor(diffInSeconds / SECONDS_IN_MINUTE);
    return `${minutes} min`;
  } else if (diffInSeconds < SECONDS_IN_DAY) {
    const hours = Math.floor(diffInSeconds / SECONDS_IN_HOUR);
    return `${hours} h`;
  } else {
    return postDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }
};
