import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTransactions } from 'contexts/Guilds';
import { WriterHooksInteface } from 'stores/types';
import { formatUnits } from 'ethers/lib/utils';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';

type IUseWithdrawTokens = WriterHooksInteface['useWithdrawTokens'];
type IHandleWithdrawTokens = ReturnType<IUseWithdrawTokens>;

export const useWithdrawTokens: IUseWithdrawTokens = daoAddress => {
  const { t } = useTranslation();
  const { createTransaction } = useTransactions();
  const guildContract = useERC20Guild(daoAddress);

  const handleWithdrawTokens: IHandleWithdrawTokens = useCallback(
    async (amount, decimals?, symbol?) => {
      const formattedAmount = decimals
        ? ` ${formatUnits(amount, decimals)}`
        : '';

      createTransaction(
        t('unlockAndWithdrawTokens', {
          amount: formattedAmount,
          symbol: symbol ?? '',
        }),
        async () => guildContract.withdrawTokens(amount)
      );
    },
    [guildContract, createTransaction, t]
  );

  return handleWithdrawTokens;
};
