import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ReactComponent as Info } from 'assets/images/info.svg';
import { Tooltip } from 'components/Tooltip';
import { Toggle, ToggleContainer } from 'components/primitives/Forms/Toggle';
import { StyledIcon } from 'components/primitives/StyledIcon';
import {
  WalletModalItem,
  WalletModalItemTitle,
  WalletModalItemValue,
} from 'components/Web3Modals/WalletModal/WalletModal.styled';
import { BiShapePolygon } from 'react-icons/bi';

export const DecentralizeMode: React.FC = () => {
  const { t } = useTranslation();

  const localStorageDecentralizeMode =
    localStorage.getItem('decentralizeMode') === 'true';
  const [isDecentralizeMode, setIsDecentralizeMode] = useState(
    localStorageDecentralizeMode
  );

  const handleDecentralizeModeChanged = () => {
    console.log('handleDecentralizeModeChanged');

    localStorage.setItem('decentralizeMode', String(!isDecentralizeMode));
    setIsDecentralizeMode(!isDecentralizeMode);
  };
  return (
    <WalletModalItem>
      <WalletModalItemTitle>
        <BiShapePolygon size={24} />
        {/* TODO: fix name */}
        {t('decentralizeMode.decentralizeMode')}
        <Tooltip
          text={t('decentralizeMode.decentralizeModeTooltip')}
          placement="bottom"
        >
          <StyledIcon src={Info} />
        </Tooltip>
      </WalletModalItemTitle>
      <WalletModalItemValue>
        <ToggleContainer marginRight="0.3rem">
          <Toggle
            value={isDecentralizeMode}
            onChange={handleDecentralizeModeChanged}
            small
            name="toggle-is-default-value"
          />
        </ToggleContainer>
      </WalletModalItemValue>
    </WalletModalItem>
  );
};
