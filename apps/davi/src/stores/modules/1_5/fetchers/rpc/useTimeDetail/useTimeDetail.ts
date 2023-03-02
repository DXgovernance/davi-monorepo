import { FetcherHooksInterface } from 'stores/types';

type IUseTimeDetail = FetcherHooksInterface['useTimeDetail'];

// TODO: implement actual time-detail for Gov 1.5

export const useTimeDetail: IUseTimeDetail = (guildId, status, endTime) => {
  return { detail: 'some time', moment: endTime };
};
