import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { WriterHooksInteface } from 'stores/types';

type IUseLockTokens = WriterHooksInteface['useLockTokens'];
type IMethodNotSupported = ReturnType<IUseLockTokens>;

export const useLockTokens: IUseLockTokens = daoAddress => {
  const { t } = useTranslation();

  const methodNotSupported: IMethodNotSupported = useCallback(
    async (stakeAmount, decimals = 18, symbol = ''): Promise<void> => {
      return new Promise((resolve, reject) => {
        reject(t('hookStoreErrors.methodNotSupported'));
      });
    },
    [t]
  );

  return methodNotSupported;
};
