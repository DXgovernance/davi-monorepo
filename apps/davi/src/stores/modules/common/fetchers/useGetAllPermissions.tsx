import { FetcherHooksInterface } from 'stores/types';

type IUseGetAllPermissions = FetcherHooksInterface['useGetAllPermissions'];

export const useGetAllPermissions: IUseGetAllPermissions = guildAddress => {
  return {
    data: null,
    isLoading: false,
    isError: true,
  };
};
