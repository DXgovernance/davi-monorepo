import { useBlockNumber, useNetwork } from 'wagmi';
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

type IUseProposalVotesOfVoter =
  FetcherHooksInterface['useProposalVotesOfVoter'];

export const useProposalVotesOfVoter: IUseProposalVotesOfVoter = (
  daoAddress: `0x${string}`,
  proposalId: `0x${string}`,
  userAddress: `0x${string}`
) => {
  const { chain } = useNetwork();
  const { data: block } = useBlockNumber({
    watch: true,
  });
  let currentBlock = 0;
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

  // Backoff and retry logic
  const backoff = (fun, successFun, failureFun, exponent) => {
    setTimeout(async () => {
      const { data } = await fun();
      if (currentBlock < 1) {
        console.log('Still fetching current block');
      } else if (data?._meta.block.number > currentBlock) {
        successFun();
      } else if (exponent <= 20) {
        backoff(fun, successFun, failureFun, exponent + 1);
      } else {
        failureFun();
      }
    }, Math.pow(2, exponent) + Math.random() * 10000);
  };

  // Listen for events
  useListenToVoteAdded(
    daoAddress,
    async () => {
      currentBlock = block;
      backoff(
        refetch,
        () => (currentBlock = 0),
        () => console.log('Failed to fetch new data'),
        0
      );
    },
    proposalId
  );

  return {
    data: parsedData,
    isLoading: loading,
    isError: !!error,
  };
};
