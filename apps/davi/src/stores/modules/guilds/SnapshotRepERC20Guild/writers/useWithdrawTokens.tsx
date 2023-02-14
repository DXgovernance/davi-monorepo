import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { WriterHooksInteface } from 'stores/types';

type IUseWithdrawTokens = WriterHooksInteface['useWithdrawTokens'];
type IMethodNotSupported = ReturnType<IUseWithdrawTokens>;

export const useWithdrawTokens: IUseWithdrawTokens = daoAddress => {
  const { t } = useTranslation();

  const methodNotSupported: IMethodNotSupported = useCallback(
    async (amount, tokenDecimals?, tokenSymbol?): Promise<void> => {
      return new Promise((resolve, reject) => {
        reject(t('hookStoreErrors.methodNotSupported'));
      });
    },
    [t]
  );

  return methodNotSupported;
};
