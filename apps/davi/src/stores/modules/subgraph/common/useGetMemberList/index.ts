import { useQuery } from '@apollo/client';
import { getMemberListDocument, getMemberListQuery } from '.graphclient';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { FetcherHooksInterface } from 'stores/types';

type IUseGetMemberList = FetcherHooksInterface['useGetMemberList'];

export const useGetMemberList: IUseGetMemberList = guildAddress => {
  const { data, loading, error } = useQuery<getMemberListQuery>(
    getMemberListDocument,
    {
      variables: { id: guildAddress?.toLowerCase() },
    }
  );

  const parsedData = useMemo(() => {
    return data?.guild?.members.map(member => {
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
