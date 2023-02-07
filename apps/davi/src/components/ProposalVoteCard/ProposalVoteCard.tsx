import {
  SidebarCard,
  SidebarCardContent,
  SidebarCardHeaderSpaced,
} from 'components/SidebarCard';
import VotesChart from './components/VoteChart/VoteChart';
import { VoteConfirmationModal } from './components/VoteConfirmationModal';
import { UserVote } from './components/UserVote';
import VoteOptions from './components/VoteOptions/VoteOptions';
import { BigNumber } from 'ethers';
import moment from 'moment';
import { Loading } from 'components/primitives/Loading';
import { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import {
  VotesContainer,
  ButtonsContainer,
  VoteActionButton,
  VoteOptionButton,
  VoteOptionsLabel,
  ToggleLabel,
} from './ProposalVoteCard.styled';
import { checkVotingPower } from './utils';
import { useTheme } from 'styled-components';
import { hasVotingPowerProps, ProposalVoteCardProps } from './types';
import { useTranslation } from 'react-i18next';
import { getOptionLabel } from 'components/ProposalVoteCard/utils';
import useVotingPowerPercent from 'Modules/Guilds/Hooks/useVotingPowerPercent';
import { useHookStoreProvider } from 'stores';
import { Toggle } from 'components/primitives/Forms/Toggle';

const ProposalVoteCard = ({
  voteData,
  proposal,
  votingPower,
  timestamp,
  userVote,
  votingMachineAddress,
}: ProposalVoteCardProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const {
    hooks: {
      writers: { useVoteOnProposal },
    },
  } = useHookStoreProvider();

  const [isPercent, setIsPercent] = useState(true);
  const [selectedOption, setSelectedOption] = useState<BigNumber>();
  const [modalOpen, setModalOpen] = useState<boolean>();
  const isOpen = useMemo(
    () => proposal?.endTime?.isAfter(moment(timestamp)),
    [proposal, timestamp]
  );

  const voteOnProposal = useVoteOnProposal(votingMachineAddress);

  const votedOptionLabel = useMemo(() => {
    if (!userVote?.option) return null;
    return getOptionLabel({
      metadata: proposal?.metadata,
      optionKey: userVote?.option,
      t,
    });
  }, [userVote?.option, proposal?.metadata, t]);

  const toastError = (msg: string) =>
    toast.error(msg, {
      style: {
        backgroundColor: theme.colors.bg1,
        borderColor: theme.colors.border1,
      },
      autoClose: 2800,
      hideProgressBar: true,
    });

  const { hasNoVotingPower, hasVotingPowerAtCurrentSnapshot } =
    checkVotingPower({
      votingPowerAtProposalSnapshot: votingPower?.atSnapshot,
      votingPowerAtProposalCurrentSnapshot: votingPower?.atCurrentSnapshot,
    });

  const handleVoteOnProposal = ({
    hasNoVotingPower,
    hasVotingPowerAtCurrentSnapshot,
  }: hasVotingPowerProps) => {
    if (hasNoVotingPower) {
      if (hasVotingPowerAtCurrentSnapshot) {
        return toastError(
          'Current voting power gained after proposal creation'
        );
      }
      return toastError('No Voting Power');
    }

    return setModalOpen(true);
  };
  return (
    <SidebarCard
      header={
        <SidebarCardHeaderSpaced>
          {!voteData ? (
            <Loading loading text />
          ) : isOpen ? (
            t('castVote')
          ) : (
            t('voteResults')
          )}
          <ToggleLabel selected={true}>{t('token')}</ToggleLabel>
          <Toggle
            name="toggle-max-value"
            aria-label="toggle max value"
            value={false}
            onChange={() => setIsPercent(!isPercent)}
          />
        </SidebarCardHeaderSpaced>
      }
    >
      <SidebarCardContent>
        <VotesContainer>
          <VotesChart isPercent={isPercent} voteData={voteData} />
          <VoteOptions
            options={voteData?.options}
            proposalMetadata={proposal?.metadata}
          />
        </VotesContainer>

        <UserVote
          isPercent={isPercent}
          voteData={voteData}
          userVote={userVote}
          votedOptionLabel={votedOptionLabel}
        />
        {/* Hide voting options if user has already voted */}
        {isOpen && !userVote?.option && voteData?.options && (
          <ButtonsContainer>
            <VoteOptionsLabel>{t('options')}</VoteOptionsLabel>

            {/* Getting the full option keys list but displaying default 0 index option at the bottom */}
            {[...Object.keys(voteData?.options).slice(1), '0'].map(
              optionKey => {
                const bItem = BigNumber.from(optionKey);
                const label = getOptionLabel({
                  metadata: proposal?.metadata,
                  optionKey: optionKey,
                  t,
                });

                return (
                  <VoteOptionButton
                    key={optionKey}
                    optionKey={Number(optionKey)}
                    active={selectedOption && selectedOption.eq(bItem)}
                    onClick={() => {
                      setSelectedOption(
                        selectedOption && selectedOption.eq(bItem)
                          ? null
                          : bItem
                      );
                    }}
                  >
                    {label}
                  </VoteOptionButton>
                );
              }
            )}

            <VoteActionButton
              disabled={!selectedOption}
              onClick={() =>
                handleVoteOnProposal({
                  hasNoVotingPower,
                  hasVotingPowerAtCurrentSnapshot,
                })
              }
            >
              {t('vote')}
            </VoteActionButton>
          </ButtonsContainer>
        )}
      </SidebarCardContent>

      <VoteConfirmationModal
        isOpen={modalOpen}
        onDismiss={() => setModalOpen(false)}
        onConfirm={() => {
          voteOnProposal(
            proposal?.id,
            selectedOption,
            votingPower.userVotingPower,
            proposal?.title
          );

          setModalOpen(false);
          setSelectedOption(null);
        }}
        selectedOption={getOptionLabel({
          metadata: proposal?.metadata,
          optionKey: selectedOption?.toNumber(),
          t,
        })}
        votingPower={votingPower?.percent}
        currentVoteAmount={useVotingPowerPercent(
          voteData?.options?.[selectedOption?.toNumber()],
          voteData?.totalLocked
        )}
      />
    </SidebarCard>
  );
};

export default ProposalVoteCard;
