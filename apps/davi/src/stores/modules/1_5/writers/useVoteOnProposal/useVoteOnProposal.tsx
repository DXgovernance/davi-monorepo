import { useCallback } from 'react';
import { WriterHooksInteface } from 'stores/types';

type IUseVoteOnProposal = WriterHooksInteface['useVoteOnProposal'];
type IHandleVoteOnProposal = ReturnType<IUseVoteOnProposal>;

// TODO: placeholder hook to prevent crashing

export const useVoteOnProposal: IUseVoteOnProposal = daoAddress => {
  const handleVoteOnProposal: IHandleVoteOnProposal = useCallback(
    async (proposalId, option, votingPower, title = '', cb = null) => {
      return;
    },
    []
  );

  return handleVoteOnProposal;
};
