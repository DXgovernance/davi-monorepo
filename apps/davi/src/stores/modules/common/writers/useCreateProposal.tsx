import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { isValidGuildProposal } from 'utils';
import { WriterHooksInteface } from 'stores/types';
import { useTransactions } from 'contexts/Guilds';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';

type IUseCreateProposal = WriterHooksInteface['useCreateProposal'];
type IHandleCreateProposal = ReturnType<IUseCreateProposal>;

export const useCreateProposal: IUseCreateProposal = daoAddress => {
  const { t } = useTranslation();
  const daoContract = useERC20Guild(daoAddress);
  const { createTransaction } = useTransactions();

  const handleCreateProposal: IHandleCreateProposal = useCallback(
    async (
      title,
      description,
      toArray,
      dataArray,
      valueArray,
      totalOptions,
      otherFields,
      cb
    ) => {
      const { contentHash } = otherFields;
      const { isValid, error } = isValidGuildProposal({
        toArray,
        dataArray,
        valueArray,
        totalOptions,
        title,
        contentHash,
      });

      if (!isValid) throw Error(error);

      createTransaction(
        `${t('createProposal')} ${title}`,
        async () => {
          return daoContract.createProposal(
            toArray,
            dataArray,
            valueArray,
            totalOptions,
            title,
            `${otherFields.contentHash}`
          );
        },
        true,
        cb
      );
    },
    [daoContract, createTransaction, t]
  );

  return handleCreateProposal;
};
