import {
  Toggle,
  ToggleContainer,
  ToggleLabel,
} from 'components/primitives/Forms/Toggle';
import { StyledIcon } from 'components/primitives/StyledIcon';
import { Tooltip } from 'components/Tooltip';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNetwork } from 'wagmi';
import { CustomRPCOption } from './components';
import { CustomRPCModal } from './CustomRPC.styled';
import { ReactComponent as Info } from 'assets/images/info.svg';

export const CustomRPC: React.FC = () => {
  const { chains } = useNetwork();
  const { t } = useTranslation();

  const localStorageDecentralizeMode =
    localStorage.getItem('decentralizeMode') === 'true';

  const [isDecentralizeMode, setIsDecentralizeMode] = useState(
    localStorageDecentralizeMode
  );

  const handleDecentralizeModeChanged = () => {
    localStorage.setItem('decentralizeMode', String(!isDecentralizeMode));
    setIsDecentralizeMode(!isDecentralizeMode);
  };

  return (
    <CustomRPCModal>
      <ToggleContainer justifyContent="center" width="100%">
        <ToggleLabel>{t('customRPC.decentralizeMode')}</ToggleLabel>
        <Tooltip
          text={t('customRPC.decentralizeModeTooltip')}
          placement="bottom"
        >
          <StyledIcon src={Info} />
        </Tooltip>
        <Toggle
          value={isDecentralizeMode}
          onChange={handleDecentralizeModeChanged}
          small
          name="toggle-is-default-value"
        />
      </ToggleContainer>
      {chains.map(chain => (
        <CustomRPCOption key={chain.id} chain={chain} />
      ))}
    </CustomRPCModal>
  );
};
