import AddressButton from 'components/AddressButton/AddressButton';
import { ProposalDescription } from 'components/ProposalDescription';
import { ProposalInfoCard } from 'components/ProposalInfoCard';
import { ProposalStatus } from 'components/ProposalStatus';
import { StyledLink } from 'components/primitives/Links';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { Loading } from 'components/primitives/Loading';
import { Result, ResultState } from 'components/Result';
import React, { useMemo } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { AiFillHome } from 'react-icons/ai';
import ProposalVoteCardWrapper from 'Modules/Guilds/Wrappers/ProposalVoteCardWrapper';
import { ExecuteButton } from 'components/ExecuteButton';
import { ProposalState } from 'types/types.guilds.d';
import useProposalMetadata from 'hooks/Guilds/useProposalMetadata';
import useVotingPowerPercent from 'Modules/Guilds/Hooks/useVotingPowerPercent';
import { ActionsBuilder } from 'components/ActionsBuilder';
import { useAccount, useNetwork } from 'wagmi';
import { isReadOnly } from 'provider/wallets';
import {
  HeaderTopRow,
  linkStyles,
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
  ProposalActionsWrapper,
  SidebarContent,
} from './Proposal.styled';
import { useTranslation } from 'react-i18next';
import { SidebarCard, SidebarCardHeaderSpaced } from 'components/SidebarCard';
import { Header as CardHeader } from 'components/Card';
import { Discussion } from 'components/Discussion';
import useDiscussionContext from 'Modules/Guilds/Hooks/useDiscussionContext';
import { useHookStoreProvider } from 'stores';
import { ProposalVotesCard } from 'components/ProposalVotesCard';
import { Flex } from 'components/primitives/Layout';
import { IconButton } from 'components/primitives/Button';
import { getBlockExplorerUrl } from 'provider';

const ProposalPage: React.FC = () => {
  const {
    hooks: {
      writers: { useExecuteProposal },
      fetchers: {
        useProposal,
        useTotalLocked,
        useGuildConfig,
        useProposalState,
        useTimeDetail,
      },
    },
  } = useHookStoreProvider();
  const { t } = useTranslation();
  const { connector } = useAccount();
  const { chainName, guildId, proposalId } = useTypedParams();
  const { chain } = useNetwork();

  const { data: proposal, error } = useProposal(guildId, proposalId);
  const { data: guildConfig } = useGuildConfig(guildId);
  const { context } = useDiscussionContext(`${guildId}-${proposalId}`);

  const { data: metadata, error: metadataError } = useProposalMetadata(
    proposal?.contentHash
  );

  const { data: totalLocked } = useTotalLocked(guildId, proposalId);

  const quorum = useVotingPowerPercent(
    guildConfig?.votingPowerForProposalExecution,
    totalLocked
  );

  const status = useProposalState(proposal);
  const endTime = useTimeDetail(guildId, status, proposal?.endTime);
  const executionTxLink = useMemo(() => {
    if (!proposal?.executionTransactionHash) return null;
    return getBlockExplorerUrl(chain, proposal?.executionTransactionHash, 'tx');
  }, [chain, proposal?.executionTransactionHash]);

  const executeProposal = useExecuteProposal(guildId);
  const handleExecuteProposal = () => executeProposal(proposalId);

  if (!proposalId || !proposal) {
    return (
      <Result
        state={ResultState.ERROR}
        title={t('proposal.errors.couldntFindTheProposal')}
        subtitle={t('proposal.errors.probablyNonExistent')}
        extra={
          <StyledLink to={`/${chainName}/${guildId}`} customStyles={linkStyles}>
            <IconButton
              variant="secondary"
              iconLeft
              padding={'0.6rem 0.8rem'}
              marginTop={'5px;'}
            >
              <FiArrowLeft style={{ marginRight: '15px' }} />{' '}
              {t('proposal.seeAllProposals')}
            </IconButton>
          </StyledLink>
        }
      />
    );
  } else if (error) {
    return (
      <Result
        state={ResultState.ERROR}
        title={t('proposal.errors.genericProposalError')}
        subtitle={error.message}
      />
    );
  }

  return (
    <PageContainer>
      <PageContent>
        <PageHeader>
          <HeaderTopRow>
            <StyledLink
              to={`/${chainName}/${guildId}`}
              customStyles={linkStyles}
            >
              <IconButton
                data-testid="proposal-home-btn"
                variant="secondary"
                iconLeft
                padding={'0.6rem 0.8rem'}
                marginTop={'5px;'}
              >
                <AiFillHome style={{ marginRight: '15px' }} />{' '}
                {guildConfig?.name}
              </IconButton>
            </StyledLink>
            {metadata?.discussionRef ? (
              <StyledLink
                to={`/${chainName}/${guildId}/discussion/${metadata?.discussionRef}`}
                customStyles={linkStyles}
              >
                <IconButton
                  data-testid="proposal-back-btn"
                  variant="secondary"
                  iconLeft
                  padding={'0.6rem 0.8rem'}
                  marginTop={'5px;'}
                >
                  <FaChevronLeft style={{ marginRight: '15px' }} />{' '}
                  {t('proposal.backToDiscussion')}
                </IconButton>
              </StyledLink>
            ) : (
              <></>
            )}

            <ProposalStatus
              status={status}
              endTime={endTime}
              executeTxLink={executionTxLink}
            />
            {status === ProposalState.Executable && !isReadOnly(connector) && (
              <ExecuteButton executeProposal={handleExecuteProposal} />
            )}
          </HeaderTopRow>
          <PageTitle data-testid="proposal-page-title">
            {proposal?.title || (
              <Loading loading text skeletonProps={{ width: '800px' }} />
            )}
          </PageTitle>
          <Flex direction="row" justifyContent="left">
            {t('proposal.createdBy')}
            <AddressButton address={proposal?.creator} />
          </Flex>
        </PageHeader>
        <ProposalDescription metadata={metadata} error={metadataError} />
        <ProposalActionsWrapper>
          <ActionsBuilder options={proposal?.options} editable={false} />
        </ProposalActionsWrapper>
        <SidebarCard
          header={
            <SidebarCardHeaderSpaced>
              <CardHeader>
                {t('discussions.activity.discussionTitle')}
              </CardHeader>
            </SidebarCardHeaderSpaced>
          }
        >
          <Discussion context={context} master={''} />
        </SidebarCard>
      </PageContent>
      <SidebarContent>
        <ProposalVoteCardWrapper
          proposal={proposal}
          proposalMetadata={metadata}
        />
        <ProposalVotesCard votes={proposal?.votes} />
        <ProposalInfoCard
          proposal={proposal}
          guildConfig={guildConfig}
          quorum={quorum}
        />
      </SidebarContent>
    </PageContainer>
  );
};

export default ProposalPage;
