import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTransactions } from 'contexts/Guilds';
import { WriterHooksInteface } from 'stores/types';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';

type IExecuteProposal = WriterHooksInteface['useExecuteProposal'];
type IHandleExecuteProposal = ReturnType<IExecuteProposal>;

export const useExecuteProposal: IExecuteProposal = daoAddress => {
  const { t } = useTranslation();
  const { createTransaction } = useTransactions();
  const daoContract = useERC20Guild(daoAddress);

  const handleExecuteProposal: IHandleExecuteProposal = useCallback(
    async proposalId => {
      createTransaction(t('proposal.actions.executeProposal'), async () => {
        return daoContract.endProposal(proposalId);
      });
    },
    [daoContract, createTransaction, t]
  );

  return handleExecuteProposal;
};
