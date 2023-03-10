/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GuildAvailabilityContext } from 'contexts/Guilds/guildAvailability';
import { useAccount } from 'wagmi';
import { AiOutlineSearch } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { isReadOnly } from 'provider/wallets';
import { Result, ResultState } from 'components/Result';
import { Flex } from 'components/primitives/Layout';
import { Input } from 'components/primitives/Forms/Input';
import { Button } from 'components/primitives/Button';
import { StyledLink } from 'components/primitives/Links';
import ProposalCardWrapper from '../../Wrappers/ProposalCardWrapper';
import { useFilter } from 'contexts/Guilds';
import { useTypedParams } from '../../Hooks/useTypedParams';
import {
  ActionButtonContainer,
  ProposalsList,
  StyledHeading,
} from './Governance.styled';
import { ProposalState } from 'types/types.guilds.d';
import Discussions from 'Modules/Social/Discussions';
import { useHookStoreProvider } from 'stores';
import { WalletModal } from 'components/Web3Modals';
const Governance = ({ guildId }) => {
  const {
    hooks: {
      fetchers: { useGetNumberOfActiveProposals, useGuildProposalIds },
    },
  } = useHookStoreProvider();

  const { isLoading } = useContext(GuildAvailabilityContext);
  const { data: proposalIds, errorMessage } = useGuildProposalIds(guildId);
  const { t } = useTranslation();
  const { data: activeProposals } = useGetNumberOfActiveProposals(guildId);
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

  /*
  Since filters are a global state, we need to reset all of them
  who were set in the "All proposals" view. If we don't do this,
  filters applied in that view will impact here
  */

  const {
    onResetState,
    onResetActionType,
    onResetCurrency,
    onToggleState,
    searchQuery,
    setSearchQuery,
    isStateSelected,
  } = useFilter();

  // Reset filters when page loads
  useEffect(() => {
    setSearchQuery('');
    onResetActionType();
    onResetCurrency();
    onResetState();
  }, []);

  // Show only 'Active' and 'Executable' proposals
  useEffect(() => {
    if (!isStateSelected(ProposalState.Active))
      onToggleState(ProposalState.Active);
    if (!isStateSelected(ProposalState.Executable))
      onToggleState(ProposalState.Executable);
  }, [onToggleState]);

  const reversedProposals = useMemo(() => {
    if (!proposalIds) return null;
    // clone array as the original proposalIds array from Ethers is immutable
    const clone = [...proposalIds];
    // Show latest proposals first
    return clone.reverse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposalIds]);

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

  if (!isLoading && !proposalIds && errorMessage) {
    return (
      <Result
        state={ResultState.ERROR}
        title={t('proposal.errors.genericProposalError')}
        subtitle={errorMessage}
      />
    );
  }

  return (
    <>
      <Flex direction="row">
        <Input
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
          }}
          icon={<AiOutlineSearch size={24} />}
          placeholder={t('filter.searchTitleEnsAddress')}
          marginRight={'1rem'}
        />
        <ActionButtonContainer onClick={handleCreateDiscussion}>
          <Button
            variant="primaryWithBorder"
            data-testid="create-discussion-btn"
          >
            {t('discussions.createDiscussion')}
          </Button>
        </ActionButtonContainer>
      </Flex>
      <ProposalsList data-testid="proposals-list">
        <StyledHeading size={2}>{t('proposals.proposals')}</StyledHeading>
        {activeProposals && activeProposals._hex === '0x00' && (
          <div data-testid="no-active-proposals-message">
            {t('proposals.noActiveProposalsMessage')}.{' '}
            <StyledLink
              data-testid="all-proposals-hyperlink"
              to={`/${chainName}/${guildId}/all-proposals`}
            >
              {t('proposals.goToAllProposalsPage')}.
            </StyledLink>
          </div>
        )}
        {proposalIds ? (
          <>
            {reversedProposals.map(proposal => (
              <ProposalCardWrapper key={proposal} proposalId={proposal} />
            ))}
          </>
        ) : (
          <>
            <ProposalCardWrapper />
            <ProposalCardWrapper />
            <ProposalCardWrapper />
            <ProposalCardWrapper />
            <ProposalCardWrapper />
          </>
        )}
      </ProposalsList>
      <ProposalsList>
        <StyledHeading size={2}>
          {t('discussions.discussions_other')}
        </StyledHeading>
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

export default Governance;
