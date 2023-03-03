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
    async proposal => {
      createTransaction(t('proposal.actions.executeProposal'), async () => {
        try {
          return daoContract.endProposal(proposal.id);
        } catch (e) {
          console.error(e);
          return null;
        }
      });
    },
    [daoContract, createTransaction, t]
  );

  return handleExecuteProposal;
};
