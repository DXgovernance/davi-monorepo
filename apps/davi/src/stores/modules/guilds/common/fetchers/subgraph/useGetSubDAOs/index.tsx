import { useTranslation } from 'react-i18next';
import { FetcherHooksInterface } from 'stores/types';

type IUseGetSubDAOs = FetcherHooksInterface['useGetSubDAOs'];

/*
  This method is not supported on Guilds
*/

export const useGetSubDAOs: IUseGetSubDAOs = () => {
  const { t } = useTranslation();
  return {
    data: null,
    isLoading: false,
    isError: true,
    errorMessage: t('hookStoreErrors.methodNotSupported'),
  };
};
