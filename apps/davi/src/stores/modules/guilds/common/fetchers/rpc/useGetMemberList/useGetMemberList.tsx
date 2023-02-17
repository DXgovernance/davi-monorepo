import { FetcherHooksInterface } from 'stores/types';

type IUseGetMemberList = FetcherHooksInterface['useGetMemberList'];

export const useGetMemberList: IUseGetMemberList = guildAddress => {
  return {
    data: null,
    isLoading: false,
    isError: true,
  };
};
