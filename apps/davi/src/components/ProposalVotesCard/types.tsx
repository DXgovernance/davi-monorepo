import { Proposal } from 'types/types.guilds.d';

export interface ProposalVotesCardProps {
  votes: Proposal['votes'];
}

export interface Vote {
  optionLabel: string;
  voter: string;
  votingPower: number;
}
