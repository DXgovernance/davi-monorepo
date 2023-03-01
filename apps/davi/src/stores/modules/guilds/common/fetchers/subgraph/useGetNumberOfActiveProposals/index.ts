import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { BigNumber } from 'ethers';
import {
  getNumberOfActiveProposalsDocument,
  getNumberOfActiveProposalsQuery,
} from '.graphclient';
import { useListenToProposalStateChanged } from 'stores/modules/guilds/common/events/useListenToProposalStateChanged';
import { useNetwork } from 'wagmi';
import { getApolloClient } from 'clients/apollo';
import { SupportedSubgraph } from 'stores/types';

export const useGetNumberOfActiveProposals = (guildAddress: string) => {
  const { chain } = useNetwork();

  const { data, refetch, loading, error } =
    useQuery<getNumberOfActiveProposalsQuery>(
      getNumberOfActiveProposalsDocument,
      {
        client: getApolloClient(SupportedSubgraph.Guilds, chain?.id),
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
