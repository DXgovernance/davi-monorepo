import moment from 'moment';
import useTimeDifferenceHumanized from './useTimeDifferenceHumanized';

describe('useTimeDifferenceHumanized', () => {
  it('should return humanized date for the diff between from and to dates', () => {
    const toDate = moment('2022-05-09T08:00:00+00:00');
    const fromDate = moment('2022-01-09T08:00:00+00:00');

    const humanizedDate = useTimeDifferenceHumanized(toDate, fromDate);
    expect(humanizedDate).toBe('4 duration.months_other');
  });
});
