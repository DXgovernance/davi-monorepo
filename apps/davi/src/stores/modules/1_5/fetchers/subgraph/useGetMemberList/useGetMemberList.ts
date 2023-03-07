import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useNetwork } from 'wagmi';
import { FetcherHooksInterface, SupportedSubgraph } from 'stores/types';
import { getApolloClient } from 'clients/apollo';
import { getMemberList1_5Document, getMemberList1_5Query } from '.graphclient';
import { BigNumber } from 'ethers';

type IUseGetMemberList = FetcherHooksInterface['useGetMemberList'];

export const useGetMemberList: IUseGetMemberList = (daoId: string) => {
  const { chain } = useNetwork();

  const { data, loading, error } = useQuery<getMemberList1_5Query>(
    getMemberList1_5Document,
    {
      client: getApolloClient(SupportedSubgraph.Guilds, chain?.id),
      variables: { id: daoId?.toLowerCase() },
    }
  );

  const membersList = useMemo(() => {
    return data?.dao?.reputationToken?.members.map(member => {
      return {
        id: member.id,
        address: member.address as `0x${string}`,
        tokensLocked: BigNumber.from(member.reputationTokenAmount),
      };
    });
  }, [data?.dao?.reputationToken?.members]);

  return { data: membersList, isLoading: loading, isError: !!error };
};
