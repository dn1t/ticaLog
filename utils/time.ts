export const dateString = (date: Date | number) => {
  if (!(date instanceof Date)) date = new Date(date);

  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

export const timeSince = (date: Date | number) => {
  if (date instanceof Date) date = date.getTime();

  let seconds = Math.floor((Date.now() - date) / 1000);
  let beforeOrAfter =
    seconds < 0
      ? (() => {
          seconds = Math.abs(seconds);
          return '후';
        })()
      : '전';

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + '년 ' + beforeOrAfter;
  }
  interval = seconds / 2592000;

  if (interval > 1) {
    return Math.floor(interval) + '달 ' + beforeOrAfter;
  }
  interval = seconds / 86400;

  if (interval > 1) {
    return Math.floor(interval) + '일 ' + beforeOrAfter;
  }
  interval = seconds / 3600;

  if (interval > 1) {
    return Math.floor(interval) + '시간 ' + beforeOrAfter;
  }
  interval = seconds / 60;

  if (interval > 1) {
    return Math.floor(interval) + '분 ' + beforeOrAfter;
  }

  return Math.floor(seconds) + '초 ' + beforeOrAfter;
};
