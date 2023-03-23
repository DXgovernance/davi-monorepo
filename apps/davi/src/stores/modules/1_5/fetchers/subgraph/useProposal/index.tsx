import { useMemo } from 'react';
import { useNetwork } from 'wagmi';
import { unix } from 'moment';
import { useQuery } from '@apollo/client';
import { BigNumber } from 'ethers';

import { getDaoProposalDocument, getDaoProposalQuery } from '.graphclient';
import { FetcherHooksInterface, SupportedSubgraph } from 'stores/types';
import { getApolloClient } from 'clients/apollo';
import {
  ContractState,
  HolographicConsensusState,
  Proposal,
} from 'types/types.guilds.d';
import { IStakes } from 'components/HolographicConsensusCard/types';
import { useProposalCalls } from '../../rpc/useProposalCalls';

type IUseProposal = FetcherHooksInterface['useProposal'];

export const useProposal: IUseProposal = (daoId, proposalId) => {
  const { chain } = useNetwork();

  const { data, error } = useQuery<getDaoProposalQuery>(
    getDaoProposalDocument,
    {
      client: getApolloClient(SupportedSubgraph.Governance1_5, chain?.id),
      variables: {
        id: daoId?.toLowerCase(),
        proposalId: proposalId?.toLowerCase(),
      },
    }
  );

  const parsedProposalData: Proposal = useMemo(() => {
    if (!data || !data.dao || !data.dao.schemes) return null;

    const schemeWithProposal = data.dao.schemes.find(
      scheme => scheme.proposals.length === 1
    );
    if (!schemeWithProposal) return null;

    const proposal = schemeWithProposal.proposals[0];

    const {
      id,
      proposer,
      submittedTime,
      to,
      callData,
      value,
      title,
      descriptionHash,
      state,
      totalVotes,
      scheme: { id: schemeId },
      stakes,
      votingMachineProposalState,
    } = proposal;

    let mappedContractState: ContractState;

    switch (state) {
      case 'None':
        mappedContractState = ContractState.Active;
        break;
      case 'Submitted':
        mappedContractState = ContractState.Active;
        break;
      case 'Rejected':
        mappedContractState = ContractState.Rejected;
        break;
      case 'Passed':
        mappedContractState = ContractState.Executed;
        break;
      default:
        mappedContractState = ContractState.Active;
        break;
    }

    let mappedHolographicConsensusState: HolographicConsensusState;

    switch (votingMachineProposalState) {
      case 'None':
        mappedHolographicConsensusState = HolographicConsensusState.None;
        break;
      case 'Expired':
        mappedHolographicConsensusState = HolographicConsensusState.Expired;
        break;
      case 'ExecutedInQueue':
        mappedHolographicConsensusState =
          HolographicConsensusState.ExecutedInQueue;
        break;
      case 'ExecutedInBoost':
        mappedHolographicConsensusState =
          HolographicConsensusState.ExecutedInBoost;
        break;
      case 'Queued':
        mappedHolographicConsensusState = HolographicConsensusState.Queued;
        break;
      case 'PreBoosted':
        mappedHolographicConsensusState = HolographicConsensusState.PreBoosted;
        break;
      case 'Boosted':
        mappedHolographicConsensusState = HolographicConsensusState.Boosted;
        break;
      case 'QuietEndingPeriod':
        mappedHolographicConsensusState =
          HolographicConsensusState.QuietEndingPeriod;
        break;
      default:
        mappedHolographicConsensusState = HolographicConsensusState.None;
        break;
    }

    const noVotes = BigNumber.from(totalVotes[0]);
    const yesVotes = BigNumber.from(totalVotes[1]);

    // Stakes processing
    const noStakes = stakes.filter(stake => stake.option === '1');
    const yesStakes = stakes.filter(stake => stake.option === '2');
    const parsedStakes: IStakes = {
      for: yesStakes,
      against: noStakes,
    };

    // Total staked
    const totalNoStakes = noStakes.reduce(
      (acc, stake) => acc.add(stake.amount),
      BigNumber.from(0)
    );
    const totalYesStakes = yesStakes.reduce(
      (acc, stake) => acc.add(stake.amount),
      BigNumber.from(0)
    );

    return {
      id: id as `0x${string}`, // typecast to comply with template literal type
      creator: proposer,
      startTime: unix(submittedTime),
      endTime: unix(submittedTime), // TODO: implement
      to,
      data: callData,
      value,
      title,
      contentHash: descriptionHash,
      contractState: mappedContractState,
      totalVotes: [noVotes, yesVotes],
      options: null,
      votes: null,
      totalOptions: null, // Not used in the codebase but in the deploy scripts
      subDao: schemeId,
      stakes: parsedStakes,
      totalStaked: [totalNoStakes, totalYesStakes],
      holographicConsensusState: mappedHolographicConsensusState,
    };
  }, [data]);

  const { options } = useProposalCalls(daoId, parsedProposalData);
  if (parsedProposalData && options) parsedProposalData.options = options;

  return {
    data: parsedProposalData,
    error,
  };
};
