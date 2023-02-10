import { Proposal } from 'types/types.guilds.d';

export interface ProposalVotesCardProps {
  guildId: `0x${string}`;
  proposal: Proposal;
}

export interface Vote {
  optionLabel: string;
  voter: string;
  votingPower: number;
}
