import { Proposal, ContractState, ProposalState } from 'types/types.guilds.d';

// Contract state is direct contract storage state but we want to show more accurate up to date data to the user so we process into proposalState

// TODO: implement actual states Gov 1.5

export const useProposalState = (proposal: Proposal): ProposalState => {
  if (!proposal) return ProposalState.Active;
  switch (proposal.contractState) {
    case ContractState.Active:
      return ProposalState.Active;
    case ContractState.Executed:
      return ProposalState.Executed;
    case ContractState.Rejected:
      return ProposalState.Rejected;
    case ContractState.Failed:
      return ProposalState.Failed;
    default:
      return ProposalState.Active;
  }
};
