import { FetcherHooksInterface, SupportedSubgraph } from 'stores/types';
import { useQuery } from '@apollo/client';
import {
  getProposalVotesOfVoterDocument,
  getProposalVotesOfVoterQuery,
} from '.graphclient';
import { useListenToVoteAdded } from 'stores/modules/guilds/common/events';
import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { useNetwork } from 'wagmi';
import { getApolloClient } from 'clients/apollo';

type IUseProposalVotesOfVoter =
  FetcherHooksInterface['useProposalVotesOfVoter'];

export const useProposalVotesOfVoter: IUseProposalVotesOfVoter = (
  daoAddress: `0x${string}`,
  proposalId: `0x${string}`,
  userAddress: `0x${string}`
) => {
  const { chain } = useNetwork();

  const { data, refetch, loading, error } =
    useQuery<getProposalVotesOfVoterQuery>(getProposalVotesOfVoterDocument, {
      client: getApolloClient(SupportedSubgraph.Guilds, chain?.id),
      variables: {
        proposalId: proposalId,
        userAddress: userAddress?.toLowerCase(),
      },
    });

  const parsedData = useMemo(() => {
    const votes = data?.proposal?.votes;

    if (votes?.length > 0) {
      return {
        option: votes[0]?.option,
        votingPower: BigNumber.from(votes[0]?.votingPower),
      };
    } else {
      return {
        option: null,
        votingPower: null,
      };
    }
  }, [data?.proposal?.votes]);

  useListenToVoteAdded(daoAddress, refetch, proposalId);

  return {
    data: parsedData,
    isLoading: loading,
    isError: !!error,
  };
};
