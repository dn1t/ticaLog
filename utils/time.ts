export const dateString = (date: Date | number) => {
  if (!(date instanceof Date)) date = new Date(date);

  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

export const timeSince = (date: Date | number) => {
  if (date instanceof Date) date = date.getTime();

  const seconds = Math.floor((Date.now() - date) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    const dateInstance = new Date(date);
    return `${dateInstance.getFullYear()}/${dateInstance.getMonth() + 1}/${dateInstance.getDate()}`;
  }
  interval = seconds / 2592000;

  if (interval > 1) {
    return Math.floor(interval) + '달 전';
  }
  interval = seconds / 86400;

  if (interval > 1) {
    return Math.floor(interval) + '일 전';
  }
  interval = seconds / 3600;

  if (interval > 1) {
    return Math.floor(interval) + '시간 전';
  }
  interval = seconds / 60;

  if (interval > 1) {
    return Math.floor(interval) + '분 전';
  }

  return Math.floor(seconds) + '초 전';
};
