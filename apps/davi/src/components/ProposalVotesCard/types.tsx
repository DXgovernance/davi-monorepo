export interface ProposalVotesCardProps {
  guildId: `0x${string}`;
  proposalId: `0x${string}`;
}

export interface Vote {
  optionLabel: string;
  voter: string;
  votingPower: number;
}
