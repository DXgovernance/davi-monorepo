import moment, { Moment } from 'moment';

export function isBeforeCurrentTime(time: Moment) {
  const currentTime = moment();
  return time?.isBefore(currentTime);
}
