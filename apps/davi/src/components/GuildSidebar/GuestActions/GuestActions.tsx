import { Button } from 'components/primitives/Button';
import { StyledButton } from 'Modules/Guilds/styles';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
export interface GuestActionsProps {
  userWalletAddress?: string;
  onShowStakeModal?: () => void;
  onShowWalletModal?: () => void;
}

export const GuestActions: React.FC<GuestActionsProps> = ({
  userWalletAddress,
  onShowStakeModal,
  onShowWalletModal,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <>
      {userWalletAddress ? (
        <StyledButton
          data-testid="open-stake-tokens-modal-btn"
          backgroundColor={theme.colors.darkGreen1}
          onClick={onShowStakeModal}
        >
          {t('join')}
        </StyledButton>
      ) : (
        <Button
          onClick={onShowWalletModal}
          data-testid={'guest-action-connect-wallet'}
        >
          {t('connectWallet')}
        </Button>
      )}
    </>
  );
};
