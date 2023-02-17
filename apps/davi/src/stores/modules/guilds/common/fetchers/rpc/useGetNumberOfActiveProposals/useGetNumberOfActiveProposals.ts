import { useContractRead } from 'wagmi';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { useListenToProposalStateChanged } from 'stores/modules/guilds/common/events';
import { FetcherHooksInterface } from 'stores/types';

type IUseGetNumberOfActiveProposals =
  FetcherHooksInterface['useGetNumberOfActiveProposals'];

export const useGetNumberOfActiveProposals: IUseGetNumberOfActiveProposals = (
  daoId: string
) => {
  const { data, refetch, isLoading, isError } = useContractRead({
    address: daoId,
    abi: BaseERC20Guild.abi,
    functionName: 'getActiveProposalsNow',
  });
  useListenToProposalStateChanged(daoId, refetch);
  return { data, isLoading, isError };
};
