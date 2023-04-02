import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { WriterHooksInteface } from 'stores/types';

type IUseStakeOnProposal = WriterHooksInteface['useStakeOnProposal'];
type IMethodNotSupported = ReturnType<IUseStakeOnProposal>;

export const useStakeOnProposal: IUseStakeOnProposal = (
  daoAddress,
  subDaoAddress
) => {
  const { t } = useTranslation();

  const methodNotSupported: IMethodNotSupported = useCallback(
    async (
      proposalId,
      option,
      stakeAmount,
      title = '',
      cb = null
    ): Promise<void> => {
      return new Promise((resolve, reject) => {
        reject(t('hookStoreErrors.methodNotSupported'));
      });
    },
    [t]
  );

  return methodNotSupported;
};
