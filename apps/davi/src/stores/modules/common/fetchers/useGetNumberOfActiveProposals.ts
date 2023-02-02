import { useContractRead } from 'wagmi';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { useListenToProposalStateChanged } from '../events/useListenToProposalStateChanged';

export const useGetNumberOfActiveProposals = (daoId: string) => {
  const { data, refetch, ...rest } = useContractRead({
    address: daoId,
    abi: BaseERC20Guild.abi,
    functionName: 'getActiveProposalsNow',
  });
  useListenToProposalStateChanged(daoId, refetch);
  return { data, refetch, ...rest };
};
