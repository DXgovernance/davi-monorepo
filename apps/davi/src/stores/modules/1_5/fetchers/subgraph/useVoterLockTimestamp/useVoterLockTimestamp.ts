import { FetcherHooksInterface } from 'stores/types';

type IUseVoterLockTimestamp = FetcherHooksInterface['useVoterLockTimestamp'];

export const useVoterLockTimestamp: IUseVoterLockTimestamp = (
  contractAddress: `0x${string}`,
  userAddress: `0x${string}`
) => {
  // This method isn't supported in REP guilds
  return {
    data: null,
  };
};
