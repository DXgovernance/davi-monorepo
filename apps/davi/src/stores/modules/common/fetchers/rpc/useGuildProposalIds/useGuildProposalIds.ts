import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { useMemo } from 'react';
import { FetcherHooksInterface } from 'stores/types';
import { useContractRead } from 'wagmi';
import { useListenToProposalStateChanged } from '../../../events/useListenToProposalStateChanged';

type IUseGuildProposalIds = FetcherHooksInterface['useGuildProposalIds'];

export const useGuildProposalIds: IUseGuildProposalIds = (
  daoId: `0x${string}`
) => {
  const { data, refetch, isError, isLoading, error } = useContractRead({
    address: daoId,
    abi: BaseERC20Guild.abi,
    functionName: 'getProposalsIds',
  });

  // removing the readonly property from data
  const parsedData = useMemo(() => {
    return data?.map(proposalId => {
      return proposalId;
    });
  }, [data]);

  const errorMessage = error?.message;

  useListenToProposalStateChanged(daoId, refetch);
  return { data: parsedData, isError, isLoading, errorMessage };
};
