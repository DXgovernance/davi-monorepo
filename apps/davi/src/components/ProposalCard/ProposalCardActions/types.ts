import { FetcherHooksInterface } from 'stores/types';

type UseProposalVotesOfVoterReturn = ReturnType<
  FetcherHooksInterface['useProposalVotesOfVoter']
>['data'];

export interface ProposalCardActionsProps {
  votesOfVoter: UseProposalVotesOfVoterReturn;
  proposalCreator: string;
  userAddress: string;
}
