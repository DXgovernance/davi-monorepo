import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import {
  getNumberOfActiveProposalsDocument,
  getNumberOfActiveProposalsQuery,
} from '.graphclient';
import { BigNumber } from 'ethers';
import { useListenToProposalStateChanged } from 'stores/modules/guilds/common/events/useListenToProposalStateChanged';

export const useGetNumberOfActiveProposals = (guildAddress: string) => {
  const { data, refetch, loading, error, ...rest } =
    useQuery<getNumberOfActiveProposalsQuery>(
      getNumberOfActiveProposalsDocument,
      {
        variables: { id: guildAddress?.toLowerCase() },
      }
    );
  const transformedData = useMemo(() => {
    if (!data?.guild) return undefined;
    return BigNumber.from(data.guild.proposals.length);
  }, [data]);
  useListenToProposalStateChanged(guildAddress, refetch);
  return {
    data: transformedData,
    refetch,
    isLoading: loading,
    isError: !!error,
    ...rest,
  };
};
