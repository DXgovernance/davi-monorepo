import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTransactions } from 'contexts/Guilds';
import { WriterHooksInteface } from 'stores/types';
import { useVotingMachineContract } from 'hooks/Guilds/contracts/useContract';

type IUseVoteOnProposal = WriterHooksInteface['useVoteOnProposal'];
type IHandleVoteOnProposal = ReturnType<IUseVoteOnProposal>;

export const useVoteOnProposal: IUseVoteOnProposal = (
  daoAddress,
  votingMachineAddress
) => {
  const { t } = useTranslation();
  const { createTransaction } = useTransactions();

  const votingMachineContract = useVotingMachineContract(votingMachineAddress);

  const handleVoteOnProposal: IHandleVoteOnProposal = useCallback(
    async (proposalId, option, votingPower, title = '', cb = null) => {
      createTransaction(
        `${t('voting.voteOnProposal')}${` ${title}` ?? ''}`,
        async () => votingMachineContract.vote(proposalId, option, votingPower),
        true,
        cb
      );
    },
    [createTransaction, t, votingMachineContract]
  );

  return handleVoteOnProposal;
};
