import { useTranslation } from 'react-i18next';
import { Flex } from 'components/primitives/Layout';
import { useTypedParams } from '../../Hooks/useTypedParams';
import { ActionButtonContainer, ProposalsList } from './AllDiscussions.styled';
import Discussions from 'Modules/Social/Discussions';
import { Button } from 'components/primitives/Button';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useMemo, useState } from 'react';
import { isReadOnly } from 'provider/wallets';
import { WalletModal } from 'components/Web3Modals';

const AllDiscussions = ({ guildId }) => {
  const { t } = useTranslation();
  const { chainName } = useTypedParams();

  const {
    connector,
    isConnecting: isWalletConnecting,
    isConnected: isWalletConnected,
  } = useAccount();

  const navigate = useNavigate();

  const hasWalletConnection = useMemo(() => {
    return !isWalletConnecting && !isReadOnly(connector) && isWalletConnected;
  }, [connector, isWalletConnected, isWalletConnecting]);

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const toggleWalletModal = () => {
    /**
     * Route to the create discussion page, despite of the wallet connectivity status
     */
    if (isWalletModalOpen) {
      navigate(`/${chainName}/${guildId}/create`);
    }

    setIsWalletModalOpen(!isWalletModalOpen);
  };

  const handleCreateDiscussion = () => {
    if (hasWalletConnection) {
      navigate(`/${chainName}/${guildId}/create`);
    } else {
      toggleWalletModal();
    }
  };

  return (
    <>
      <Flex direction="row" justifyContent="right">
        <ActionButtonContainer onClick={handleCreateDiscussion}>
          <Button
            variant="primaryWithBorder"
            data-testid="create-discussion-button"
          >
            {t('discussions.createDiscussion')}
          </Button>
        </ActionButtonContainer>
      </Flex>
      <ProposalsList>
        <Discussions />
      </ProposalsList>
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={toggleWalletModal}
        title={t('connections.connectTheWalletToProceed')}
      />
    </>
  );
};

export default AllDiscussions;
