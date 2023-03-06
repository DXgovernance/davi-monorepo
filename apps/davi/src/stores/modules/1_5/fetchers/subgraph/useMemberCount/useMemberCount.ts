import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useNetwork } from 'wagmi';
import { FetcherHooksInterface } from 'stores/types';
import { apolloClient } from 'clients/apollo';
import { SUPPORTED_DAVI_NETWORKS } from 'utils';
import { getMemberList1_5Document, getMemberList1_5Query } from '.graphclient';

type IUseMemberCount = FetcherHooksInterface['useMemberCount'];

export const useMemberCount: IUseMemberCount = (daoId: `0x${string}`) => {
  const { chain } = useNetwork();
  const chainId: SUPPORTED_DAVI_NETWORKS = useMemo(() => chain?.id, [chain]);

  const { data, loading, error } = useQuery<getMemberList1_5Query>(
    getMemberList1_5Document,
    {
      client: apolloClient[chainId]['Governance1.5'],
      variables: { id: daoId?.toLowerCase() },
    }
  );

  const membersCount = useMemo(() => {
    return data?.dao?.reputationToken?.members?.length;
  }, [data?.dao?.reputationToken?.members]);

  return { data: membersCount, isLoading: loading, isError: !!error };
};
