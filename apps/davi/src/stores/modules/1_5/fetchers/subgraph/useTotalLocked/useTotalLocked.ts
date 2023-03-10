import { getTotalLockedDocument, getTotalLockedQuery } from '.graphclient';
import { useQuery } from '@apollo/client';
import { getApolloClient } from 'clients/apollo';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { FetcherHooksInterface, SupportedSubgraph } from 'stores/types';
import { useNetwork } from 'wagmi';

type IUseTotalLocked = FetcherHooksInterface['useTotalLocked'];

export const useTotalLocked: IUseTotalLocked = (
  daoId: string,
  proposalId?: string
) => {
  const { chain } = useNetwork();

  const { data, loading, error } = useQuery<getTotalLockedQuery>(
    getTotalLockedDocument,
    {
      client: getApolloClient(SupportedSubgraph.Governance1_5, chain?.id),
      variables: { id: daoId?.toLowerCase() },
    }
  );

  const totalLocked = useMemo(() => {
    if (!data?.dao) return undefined;
    return BigNumber.from(data?.dao?.reputationToken?.amount);
  }, [data?.dao]);

  return {
    data: totalLocked,
    isLoading: loading,
    isError: !!error,
  };
};
