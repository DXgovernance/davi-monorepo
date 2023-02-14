import { FetcherHooksInterface } from 'stores/types';

type IUseGetVotes = FetcherHooksInterface['useGetVotes'];

export const useGetVotes: IUseGetVotes = (guildId, proposal) => {
  return {
    data: null,
    isLoading: false,
    isError: true,
  };
};
