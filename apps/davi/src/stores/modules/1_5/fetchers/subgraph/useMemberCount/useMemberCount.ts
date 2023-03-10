import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useNetwork } from 'wagmi';
import { FetcherHooksInterface, SupportedSubgraph } from 'stores/types';
import { getApolloClient } from 'clients/apollo';
import { getMemberList1_5Document, getMemberList1_5Query } from '.graphclient';

type IUseMemberCount = FetcherHooksInterface['useMemberCount'];

export const useMemberCount: IUseMemberCount = (daoId: `0x${string}`) => {
  const { chain } = useNetwork();

  const { data, loading, error } = useQuery<getMemberList1_5Query>(
    getMemberList1_5Document,
    {
      client: getApolloClient(SupportedSubgraph.Governance1_5, chain?.id),
      variables: { id: daoId?.toLowerCase() },
    }
  );

  const membersCount = useMemo(() => {
    return data?.dao?.reputationToken?.members?.length;
  }, [data?.dao?.reputationToken?.members]);

  return { data: membersCount, isLoading: loading, isError: !!error };
};
