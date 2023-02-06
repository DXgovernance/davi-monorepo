import moment, { Moment } from 'moment';
import { useTranslation } from 'react-i18next';

const YEAR_IN_MILLIS = 1000 * 60 * 60 * 24 * 365;
const DAY_IN_MILLIS = 1000 * 60 * 60 * 24;
const MONTH_IN_MILLIS = 1000 * 60 * 60 * 24 * 30;
const HOUR_IN_MILLIS = 1000 * 60 * 60;
const MINS_IN_MILLIS = 1000 * 60;

/**
 * Translates from and to time difference into human readable date format
 * @param to - to date
 * @param from - from date
 * @param depth - depth of the date humanization
 * @returns humanized date string
 */
const useTimeDifferenceHumanized = (
  to: Moment,
  from = moment(),
  depth: number = 2
) => {
  const { t } = useTranslation();
  const timeDifferenceInMilliSecs = Math.abs(from.diff(to));

  const levels: { value: number; name: string }[] = [
    {
      value: Math.floor(timeDifferenceInMilliSecs / YEAR_IN_MILLIS),
      name: t('duration.years_other'),
    },
    {
      value: Math.floor(
        (timeDifferenceInMilliSecs % YEAR_IN_MILLIS) / MONTH_IN_MILLIS
      ),
      name: t('duration.months_other'),
    },
    {
      value: Math.floor(
        ((timeDifferenceInMilliSecs % YEAR_IN_MILLIS) % MONTH_IN_MILLIS) /
          DAY_IN_MILLIS
      ),
      name: t('duration.days_other'),
    },
    {
      value: Math.floor(
        (((timeDifferenceInMilliSecs % YEAR_IN_MILLIS) % MONTH_IN_MILLIS) %
          DAY_IN_MILLIS) /
          HOUR_IN_MILLIS
      ),
      name: t('duration.hours_other'),
    },
    {
      value: Math.floor(
        ((((timeDifferenceInMilliSecs % YEAR_IN_MILLIS) % MONTH_IN_MILLIS) %
          DAY_IN_MILLIS) %
          HOUR_IN_MILLIS) /
          MINS_IN_MILLIS
      ),
      name: t('duration.mins'),
    },
    {
      value: Math.floor(
        ((((timeDifferenceInMilliSecs % YEAR_IN_MILLIS) % MONTH_IN_MILLIS) %
          DAY_IN_MILLIS) %
          HOUR_IN_MILLIS) %
          MINS_IN_MILLIS
      ),
      name: t('duration.seconds_other'),
    },
  ];

  let measurementDepth = depth;

  return levels
    .reduce((acc, level) => {
      if (
        level.value === 0 ||
        level.name === t('duration.seconds_other') ||
        measurementDepth === 0
      ) {
        return acc;
      }
      measurementDepth--;
      return (acc +=
        ' ' +
        level.value +
        ' ' +
        (level.value === 1
          ? level.name.substring(0, level.name.length - 1)
          : level.name));
    }, '')
    ?.trim();
};

export default useTimeDifferenceHumanized;
