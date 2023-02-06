import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { useContractRead } from 'wagmi';
import { useListenToProposalStateChanged } from '../events/useListenToProposalStateChanged';

export const useGuildProposalIds = (daoId: string) => {
  const { data, refetch, isError, isLoading, error } = useContractRead({
    address: daoId,
    abi: BaseERC20Guild.abi,
    functionName: 'getProposalsIds',
  });

  useListenToProposalStateChanged(daoId, refetch);
  return { data, isError, isLoading, error };
};
