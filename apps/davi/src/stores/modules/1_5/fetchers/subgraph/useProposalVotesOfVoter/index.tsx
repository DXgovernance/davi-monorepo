import { useQuery } from '@apollo/client';
import { apolloClient } from 'clients/apollo';
import { useMemo } from 'react';
import { FetcherHooksInterface } from 'stores/types';
import { SUPPORTED_DAVI_NETWORKS } from 'utils';
import { useNetwork } from 'wagmi';
import {
  getDaoVotesOfVoterDocument,
  getDaoVotesOfVoterQuery,
} from '.graphclient';

type IUseProposalVotesOfVoter =
  FetcherHooksInterface['useProposalVotesOfVoter'];

export const useProposalVotesOfVoter: IUseProposalVotesOfVoter = (
  daoId,
  proposalId,
  userAddress
) => {
  const { chain } = useNetwork();
  const chainId: SUPPORTED_DAVI_NETWORKS = useMemo(() => chain?.id, [chain]);

  const { data, error, loading } = useQuery<getDaoVotesOfVoterQuery>(
    getDaoVotesOfVoterDocument,
    {
      client: apolloClient[chainId]['Governance1.5'],
      variables: {
        id: daoId?.toLowerCase(),
        proposalId: proposalId?.toLowerCase(),
        userAddress: userAddress?.toLowerCase(),
      },
    }
  );

  type VoteDataType = Pick<
    ReturnType<IUseProposalVotesOfVoter>,
    'data'
  >['data'];

  const parsedData: VoteDataType = useMemo(() => {
    let voteData = {
      option: null,
      votingPower: null,
    };

    if (!data || !data.dao || !data.dao.schemes) return voteData;

    const schemeWithProposal = data.dao.schemes.find(
      scheme => scheme.proposals.length === 1
    );
    if (!schemeWithProposal) return voteData;

    const proposalWithVote = schemeWithProposal.proposals.find(
      proposal => proposal.votes.length === 1
    );
    if (!proposalWithVote) return voteData;

    const vote = proposalWithVote.votes[0];
    voteData.option = vote.option;
    voteData.votingPower = vote.reputation;
    return voteData;
  }, [data]);

  return {
    data: {
      option: parsedData.option,
      votingPower: parsedData.votingPower,
    },
    isError: !!error,
    isLoading: loading,
  };
};
