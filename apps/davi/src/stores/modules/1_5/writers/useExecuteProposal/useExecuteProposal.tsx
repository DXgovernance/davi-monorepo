import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTransactions } from 'contexts/Guilds';
import { WriterHooksInteface } from 'stores/types';
import { useSchemeContract } from 'hooks/Guilds/contracts/useContract';

type IExecuteProposal = WriterHooksInteface['useExecuteProposal'];
type IHandleExecuteProposal = ReturnType<IExecuteProposal>;

export const useExecuteProposal: IExecuteProposal = (
  daoAddress,
  schemeAddress
) => {
  const { t } = useTranslation();
  const { createTransaction } = useTransactions();
  const schemeContract = useSchemeContract(schemeAddress);

  const handleExecuteProposal: IHandleExecuteProposal = useCallback(
    async proposal => {
      createTransaction(t('proposal.actions.executeProposal'), async () => {
        try {
          const noVotes = proposal.totalVotes[0];
          const yesVotes = proposal.totalVotes[1];
          let winningVote = 1;

          // YES votes must be greater than NO votes. If it's equal, then NO vote wins
          if (yesVotes.gt(noVotes)) winningVote = 2;

          return schemeContract.executeProposal(proposal.id, winningVote);
        } catch (e) {
          console.error(e);
          return null;
        }
      });
    },
    [createTransaction, t, schemeContract]
  );

  return handleExecuteProposal;
};
