import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { useQuery } from '@apollo/client';
import { getMemberListDocument, getMemberListQuery } from '.graphclient';
import { FetcherHooksInterface, SupportedSubgraph } from 'stores/types';
import { getApolloClient } from 'clients/apollo';
import { useNetwork } from 'wagmi';

type IUseGetMemberList = FetcherHooksInterface['useGetMemberList'];

export const useGetMemberList: IUseGetMemberList = guildAddress => {
  const { chain } = useNetwork();
  const { data, loading, error } = useQuery<getMemberListQuery>(
    getMemberListDocument,
    {
      client: getApolloClient(SupportedSubgraph.Guilds, chain?.id),
      variables: { id: guildAddress?.toLowerCase() },
    }
  );

  const parsedData = useMemo(() => {
    return data?.guild?.members?.map(member => {
      return {
        id: member.id,
        address: member.address as `0x${string}`,
        tokensLocked: BigNumber.from(member.tokensLocked),
      };
    });
  }, [data?.guild?.members]);

  return {
    data: parsedData,
    isLoading: loading,
    isError: !!error,
  };
};
