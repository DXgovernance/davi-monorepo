import { FetcherHooksInterface } from 'stores/types';

type IUseGetVotingMachineAddressBySchemeAddress =
  FetcherHooksInterface['useGetVotingMachineAddressBySchemeAddress'];

export const useGetVotingMachineAddressBySchemeAddress: IUseGetVotingMachineAddressBySchemeAddress =
  (schemeAddress: string) => {
    // voting machine should not be implemented for guilds.
    return {
      votingMachineAddress: null,
      isLoading: false,
      isError: false,
    };
  };
