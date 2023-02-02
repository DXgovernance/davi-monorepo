import { useContractRead } from 'wagmi';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { useListenToProposalStateChanged } from '../events/useListenToProposalStateChanged';
import { FetcherHooksInterface } from 'stores/types';

type IUseGetNumberOfActiveProposals =
  FetcherHooksInterface['useGetNumberOfActiveProposals'];

export const useGetNumberOfActiveProposals: IUseGetNumberOfActiveProposals =
  daoId => {
    const { data, refetch, ...rest } = useContractRead({
      address: daoId,
      abi: BaseERC20Guild.abi,
      functionName: 'getActiveProposalsNow',
    });
    useListenToProposalStateChanged(daoId, refetch);
    return { data, refetch, ...rest };
  };
