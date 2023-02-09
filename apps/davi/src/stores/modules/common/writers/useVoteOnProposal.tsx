import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTransactions } from 'contexts/Guilds';
import { WriterHooksInteface } from 'stores/types';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';

type IUseVoteOnProposal = WriterHooksInteface['useVoteOnProposal'];
type IHandleVoteOnProposal = ReturnType<IUseVoteOnProposal>;

export const useVoteOnProposal: IUseVoteOnProposal = daoAddress => {
  const { t } = useTranslation();
  const { createTransaction } = useTransactions();
  const daoContract = useERC20Guild(daoAddress, true);

  const handleVoteOnProposal: IHandleVoteOnProposal = useCallback(
    async (proposalId, option, votingPower, title = '', cb = null) => {
      createTransaction(
        `${t('voting.voteOnProposal')}${` ${title}` ?? ''}`,
        async () => daoContract.setVote(proposalId, option, votingPower),
        true,
        cb
      );
    },
    [daoContract, createTransaction, t]
  );

  return handleVoteOnProposal;
};
