import { useQuery } from '@apollo/client';
import { getProposalDocument, getProposalQuery } from '.graphclient';
import { FetcherHooksInterface } from 'stores/types';
import { ContractState, Proposal } from 'types/types.guilds.d';
import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { unix } from 'moment';
import { useProposalCalls } from 'stores/modules/common/fetchers';

type IUseProposal = FetcherHooksInterface['useProposal'];

export const useProposal: IUseProposal = (daoId, proposalId) => {
  const daoIdLowercase = daoId.toLowerCase();
  const proposalIdLowercase = proposalId.toLowerCase();

  const { data, refetch, error } = useQuery<getProposalQuery>(
    getProposalDocument,
    {
      variables: {
        guildId: daoIdLowercase,
        id: daoIdLowercase,
        proposalId: proposalIdLowercase,
      },
    }
  );
  const proposal = data?.guild?.proposals[0];

  const parsedData: Proposal = useMemo(() => {
    if (!proposal) return null;

    const {
      id,
      creator,
      startTime,
      endTime,
      to,
      data,
      value,
      title,
      contentHash,
      contractState,
      totalVotes,
    } = proposal;

    const contractStatesMapping = {
      1: ContractState.Active,
      2: ContractState.Rejected,
      3: ContractState.Executed,
      4: ContractState.Failed,
    };
    const mappedContractState = contractStatesMapping[parseInt(contractState)];

    const totalVotesBN = totalVotes.map((vote: string) => BigNumber.from(vote));

    return {
      id: id as `0x${string}`,
      creator,
      startTime: unix(startTime),
      endTime: unix(endTime),
      to,
      data,
      value,
      title,
      contentHash,
      contractState: mappedContractState,
      totalVotes: totalVotesBN,
      options: null,
      totalOptions: null, // Not used in the codebase but in the deploy scripts
    };
  }, [proposal]);

  const { options } = useProposalCalls(daoId, proposalId, parsedData);

  if (parsedData && options) parsedData.options = options;

  return {
    data: parsedData,
    refetch,
    error,
  };
};
