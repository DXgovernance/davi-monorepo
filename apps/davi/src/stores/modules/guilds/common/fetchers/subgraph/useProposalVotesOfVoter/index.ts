import { useNetwork } from 'wagmi';
import { FetcherHooksInterface } from 'stores/types';
import { useQuery } from '@apollo/client';
import {
  getProposalVotesOfVoterDocument,
  getProposalVotesOfVoterQuery,
} from '.graphclient';
import { useListenToVoteAdded } from 'stores/modules/guilds/common/events';
import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { apolloClient } from 'clients/apollo';
import { SUPPORTED_DAVI_NETWORKS } from 'utils';
import { useBackoff } from '../utils/backoff';

type IUseProposalVotesOfVoter =
  FetcherHooksInterface['useProposalVotesOfVoter'];

export const useProposalVotesOfVoter: IUseProposalVotesOfVoter = (
  daoAddress: `0x${string}`,
  proposalId: `0x${string}`,
  userAddress: `0x${string}`
) => {
  const { chain } = useNetwork();
  const { backoff } = useBackoff();
  const chainId: SUPPORTED_DAVI_NETWORKS = useMemo(() => chain?.id, [chain]);
  const userAddressToLower = userAddress?.toLowerCase();

  const { data, refetch, loading, error } =
    useQuery<getProposalVotesOfVoterQuery>(getProposalVotesOfVoterDocument, {
      client: apolloClient[chainId]['Guilds'],
      variables: {
        proposalId: proposalId,
        userAddress: userAddressToLower,
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

  // Listen for events
  useListenToVoteAdded(daoAddress, () => backoff(refetch), proposalId);

  return {
    data: parsedData,
    isLoading: loading,
    isError: !!error,
  };
};
