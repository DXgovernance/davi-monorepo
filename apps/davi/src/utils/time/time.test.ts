import moment from 'moment';
import { isBeforeCurrentTime } from './time';

describe('isBeforeCurrentTime', () => {
  it('should return false with a future date', () => {
    const dateAfterCurrent = moment().add(1, 'day');
    const result = isBeforeCurrentTime(dateAfterCurrent);

    expect(result).toBe(false);
  });

  it('should return true with a past date', () => {
    const dateBeforeCurrent = moment().subtract(1, 'day');
    const result = isBeforeCurrentTime(dateBeforeCurrent);

    expect(result).toBe(true);
  });
});
