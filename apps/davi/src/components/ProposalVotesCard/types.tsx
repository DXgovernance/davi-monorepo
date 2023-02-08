import { Proposal } from 'types/types.guilds.d';

export interface ProposalVotesCardProps {
  proposal: Proposal;
}

export interface Vote {
  optionLabel: string;
  voter: string;
  votingPower: number;
}
