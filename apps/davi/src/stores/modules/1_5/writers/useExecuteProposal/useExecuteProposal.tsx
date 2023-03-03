import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTransactions } from 'contexts/Guilds';
import { WriterHooksInteface } from 'stores/types';
import { useSchemeContract } from 'hooks/Guilds/contracts/useContract';

type IExecuteProposal = WriterHooksInteface['useExecuteProposal'];
type IHandleExecuteProposal = ReturnType<IExecuteProposal>;

export const useExecuteProposal: IExecuteProposal = (daoId, schemeAddress) => {
  const { t } = useTranslation();
  const { createTransaction } = useTransactions();
  const schemeContract = useSchemeContract(schemeAddress);

  const handleExecuteProposal: IHandleExecuteProposal = useCallback(
    async (proposalId: string, winningOption: number) => {
      createTransaction(t('proposal.actions.executeProposal'), async () => {
        return schemeContract.executeProposal(proposalId, winningOption);
      });
    },
    [createTransaction, t, schemeContract]
  );

  return handleExecuteProposal;
};
