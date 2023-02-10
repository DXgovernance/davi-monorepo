import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { WriterHooksInteface } from 'stores/types';

type IUseApproveTokens = WriterHooksInteface['useApproveTokens'];
type IMethodNotSupported = ReturnType<IUseApproveTokens>;

export const useApproveTokens: IUseApproveTokens = tokenAddress => {
  const { t } = useTranslation();

  const methodNotSupported: IMethodNotSupported = useCallback(
    async (daoTokenVault, amount?): Promise<void> => {
      return new Promise((resolve, reject) => {
        reject(t('hookStoreErrors.methodNotSupported'));
      });
    },
    [t]
  );

  return methodNotSupported;
};
