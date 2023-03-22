import { JsonRpcProvider } from '@ethersproject/providers';
import {
  Control,
  ControlLabel,
  ControlRow,
} from 'components/primitives/Forms/Control';
import { Input } from 'components/primitives/Forms/Input';
import { Loading } from 'components/primitives/Loading';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Chain } from 'wagmi';
import { ErrorText, SaveButton } from '../CustomRPC.styled';

interface CustomRPCInputProps {
  chain: Chain;
}

interface LocalStorageRPC {
  key: string;
  value: string;
}

export const CustomRPCInput: React.FC<CustomRPCInputProps> = ({ chain }) => {
  const [error, setError] = useState('');
  const { t } = useTranslation();
  const localStorageRPCKey = `customRPC[${chain.id}]`;

  const [localStorageRPC, setLocalStorageRPC] = useState<LocalStorageRPC>({
    key: localStorageRPCKey,
    value: localStorage.getItem(localStorageRPCKey) ?? '',
  });

  const [rpcValue, setRPCValue] = useState(localStorageRPC.value);
  const [isLoading, setIsLoading] = useState(false);

  const validateRPCValue = async rpcValue => {
    const genericError = t('customRPC.genericError');
    try {
      setIsLoading(true);
      const ethersTestProvider = new JsonRpcProvider(rpcValue);
      const network = await ethersTestProvider.getNetwork();
      if (!ethersTestProvider || !network) {
        throw new Error();
      }
      setIsLoading(false);
      if (network.chainId !== chain.id) {
        setIsLoading(false);
        setError(t('customRPC.wrongChain', { chainName: chain.name }));
        return false;
      }
    } catch (e) {
      setIsLoading(false);
      setError(genericError);
      setLocalStorageRPC({ ...localStorageRPC, value: '' });
      return false;
    }

    return true;
  };

  const handleRPCSave = async chain => {
    setError('');
    if (rpcValue === '') {
      localStorage.setItem(localStorageRPC.key, '');
      setLocalStorageRPC({ ...localStorageRPC, value: '' });
      return;
    } else if (!(await validateRPCValue(rpcValue))) {
      return;
    }
    setError('');

    chain.rpcUrls.custom = rpcValue;

    localStorage.setItem(localStorageRPC.key, rpcValue);
    setLocalStorageRPC({ ...localStorageRPC, value: rpcValue });
  };

  return (
    <>
      <Control>
        <ControlLabel>{t('customRPC.customRPCUrl')}</ControlLabel>
        <ControlRow>
          <Input
            value={rpcValue}
            data-testid="rpc input"
            onChange={e => setRPCValue(e.target.value)}
            aria-label={'rpc input'}
            placeholder={t('customRPC.enterURL')}
          />
        </ControlRow>
        <ErrorText>{error}</ErrorText>
      </Control>
      {isLoading ? (
        <Loading loading></Loading>
      ) : (
        <SaveButton
          variant="tertiary"
          disabled={rpcValue === localStorageRPC.value}
          onClick={() => handleRPCSave(chain)}
        >
          {t('customRPC.saveChanges')}
        </SaveButton>
      )}
    </>
  );
};
