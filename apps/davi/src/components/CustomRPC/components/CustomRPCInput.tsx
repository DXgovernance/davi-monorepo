import {
  Control,
  ControlLabel,
  ControlRow,
} from 'components/primitives/Forms/Control';
import { Input } from 'components/primitives/Forms/Input';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Chain } from 'wagmi';
import { Error, SaveButton } from '../CustomRPC.styled';

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

  const handleRPCSave = chain => {
    if (rpcValue === '') {
      localStorage.setItem(localStorageRPC.key, '');
      setLocalStorageRPC({ ...localStorageRPC, value: '' });
      return;
    } else if (!rpcValue) {
      setError(
        'Unable to connect to the specified URL. Please check your credentials and try again'
      );
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
          />
        </ControlRow>
        <Error>{error}</Error>
      </Control>
      <SaveButton
        variant="tertiary"
        disabled={rpcValue === localStorageRPC.value}
        onClick={() => handleRPCSave(chain)}
      >
        {t('customRPC.saveChanges')}
      </SaveButton>
    </>
  );
};
