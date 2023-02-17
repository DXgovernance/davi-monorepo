import { useMemo } from 'react';
import { useNetwork } from 'wagmi';
import { BigNumber } from 'ethers';
import { useQuery } from '@apollo/client';
import { getMemberListDocument, getMemberListQuery } from '.graphclient';
import { FetcherHooksInterface } from 'stores/types';
import { apolloClient } from 'clients/apollo';

type IUseGetMemberList = FetcherHooksInterface['useGetMemberList'];

export const useGetMemberList: IUseGetMemberList = guildAddress => {
  const { chain } = useNetwork();
  const chainId = useMemo(() => chain?.id, [chain]);

  const { data, loading, error } = useQuery<getMemberListQuery>(
    getMemberListDocument,
    {
      client: apolloClient[chainId]['Guilds'],
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
