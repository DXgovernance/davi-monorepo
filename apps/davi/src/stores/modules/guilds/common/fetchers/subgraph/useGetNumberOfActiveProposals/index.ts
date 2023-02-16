import { useMemo } from 'react';
import { useNetwork } from 'wagmi';
import { useQuery } from '@apollo/client';
import { BigNumber } from 'ethers';
import {
  getNumberOfActiveProposalsDocument,
  getNumberOfActiveProposalsQuery,
} from '.graphclient';
import { useListenToProposalStateChanged } from 'stores/modules/guilds/common/events/useListenToProposalStateChanged';
import { apolloClient } from 'clients/apollo';
import { SUPPORTED_SUBGRAPHS } from 'stores/types';

export const useGetNumberOfActiveProposals = (guildAddress: string) => {
  const { chain } = useNetwork();
  const chainId = useMemo(() => chain?.id, [chain]);

  const { data, refetch, loading, error } =
    useQuery<getNumberOfActiveProposalsQuery>(
      getNumberOfActiveProposalsDocument,
      {
        client: apolloClient[chainId][SUPPORTED_SUBGRAPHS.Guilds],
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
    isLoading: loading,
    isError: !!error,
  };
};
