import { VoteOnProposalProps } from './types';

export const checkVotingPower = ({
  votingPowerAtProposalSnapshot,
  votingPowerAtProposalCurrentSnapshot,
}: VoteOnProposalProps) => {
  const hasNoVotingPower =
    votingPowerAtProposalSnapshot &&
    Number(votingPowerAtProposalSnapshot?.toString()) <= 0;

  const hasVotingPowerAtCurrentSnapshot =
    votingPowerAtProposalCurrentSnapshot &&
    Number(votingPowerAtProposalCurrentSnapshot?.toString()) > 0;
  return {
    hasNoVotingPower,
    hasVotingPowerAtCurrentSnapshot,
  };
};
