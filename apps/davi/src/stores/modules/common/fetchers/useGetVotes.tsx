import { FetcherHooksInterface } from 'stores/types';

type IUseGetVotes = FetcherHooksInterface['useGetVotes'];

export const useGetVotes: IUseGetVotes = (guildId, proposalId) => {
  return {
    data: null,
    isLoading: false,
    isError: true,
  };
};
