import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { formatUnits } from 'ethers/lib/utils';
import { useTransactions } from 'contexts/Guilds';
import { WriterHooksInteface } from 'stores/types';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';

type IUseLockTokens = WriterHooksInteface['useLockTokens'];
type IHandleLockTokens = ReturnType<IUseLockTokens>;

export const useLockTokens: IUseLockTokens = daoAddress => {
  const { t } = useTranslation();
  const { createTransaction } = useTransactions();
  const guildContract = useERC20Guild(daoAddress);

  const handleLockTokens: IHandleLockTokens = useCallback(
    async (amount, decimals?, symbol?) => {
      const formattedAmount = decimals
        ? ` ${formatUnits(amount, decimals)}`
        : '';

      createTransaction(
        t('members.locking.lockingTokens', {
          amount: formattedAmount,
          symbol: symbol ?? '',
        }),
        async () => guildContract?.lockTokens(amount)
      );
    },
    [createTransaction, guildContract, t]
  );

  return handleLockTokens;
};
