import { JsonRpcProvider } from '@ethersproject/providers';
import {
  Control,
  ControlLabel,
  ControlRow,
} from 'components/primitives/Forms/Control';
import { Input } from 'components/primitives/Forms/Input';
import { Loading } from 'components/primitives/Loading';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getChainIcon } from 'utils';
import { Chain } from 'wagmi';
import {
  ChainOptionContainer,
  ErrorText,
  SaveButton,
} from '../CustomRPC.styled';
import { CustomRPCHeader } from '.';

interface CustomRPCOptionProps {
  chain: Chain;
}

interface LocalStorageRPC {
  key: string;
  value: string;
}

export const CustomRPCOption: React.FC<CustomRPCOptionProps> = ({ chain }) => {
  const [error, setError] = useState('');
  const { t } = useTranslation();
  const localStorageRPCKey = `customRPC[${chain.id}]`;

  const [localStorageRPC, setLocalStorageRPC] = useState<LocalStorageRPC>({
    key: localStorageRPCKey,
    value: localStorage.getItem(localStorageRPCKey) ?? '',
  });

  const [isDefaultValue, setIsDefaultValue] = useState(!localStorageRPC.value);
  const [rpcValue, setRPCValue] = useState(localStorageRPC.value);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isDefaultValue) {
      setLocalStorageRPC({ ...localStorageRPC, value: '' });
      setRPCValue('');
    }
  }, [isDefaultValue, localStorageRPC]);

  useEffect(() => {
    localStorage.setItem(localStorageRPC.key, localStorageRPC.value);
  }, [localStorageRPC]);

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
    if (!(await validateRPCValue(rpcValue.trim()))) {
      return;
    }
    setError('');
    setLocalStorageRPC({ ...localStorageRPC, value: rpcValue.trim() });
  };

  return (
    <ChainOptionContainer>
      <CustomRPCHeader
        chain={chain}
        icon={getChainIcon(chain.id)}
        isDefaultValue={isDefaultValue}
        setIsDefaultValue={setIsDefaultValue}
      />
      {!isDefaultValue && (
        <Control>
          <>
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
          </>
          {isLoading ? (
            <Loading loading></Loading>
          ) : (
            <SaveButton
              variant="tertiary"
              disabled={
                rpcValue.trim() === '' || rpcValue === localStorageRPC.value
              }
              onClick={() => handleRPCSave(chain)}
            >
              {t('customRPC.saveChanges')}
            </SaveButton>
          )}
        </Control>
      )}
    </ChainOptionContainer>
  );
};
