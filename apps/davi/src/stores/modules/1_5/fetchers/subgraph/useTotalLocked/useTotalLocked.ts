import { getTotalLockedDocument, getTotalLockedQuery } from '.graphclient';
import { useQuery } from '@apollo/client';
import { apolloClient } from 'clients/apollo';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { FetcherHooksInterface } from 'stores/types';
import { SUPPORTED_DAVI_NETWORKS } from 'utils';
import { useNetwork } from 'wagmi';

type IUseTotalLocked = FetcherHooksInterface['useTotalLocked'];

export const useTotalLocked: IUseTotalLocked = (
  daoId: string,
  proposalId?: string
) => {
  const { chain } = useNetwork();
  const chainId: SUPPORTED_DAVI_NETWORKS = useMemo(() => chain?.id, [chain]);

  const { data, loading, error } = useQuery<getTotalLockedQuery>(
    getTotalLockedDocument,
    {
      client: apolloClient[chainId]['Governance1.5'],
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
