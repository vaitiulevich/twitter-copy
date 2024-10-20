export const formatTimestamp = (timestamp: number) => {
  const now = Date.now();
  const postDate = new Date(timestamp);
  const diffInSeconds = Math.floor((now - postDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} min`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} h`;
  } else {
    return postDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }
};
