import type { VoteData } from 'Modules/Guilds/Hooks/useVotingResults';
import { FetcherHooksInterface } from 'stores/types';

type UseProposalVotesOfVoterReturn = ReturnType<
  FetcherHooksInterface['useProposalVotesOfVoter']
>['data'];

export interface UserVoteProps {
  votedOptionLabel: string;
  voteData: VoteData;
  isPercent: boolean;
  userVote: UseProposalVotesOfVoterReturn;
}
