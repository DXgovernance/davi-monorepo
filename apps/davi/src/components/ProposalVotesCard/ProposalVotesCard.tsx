import {
  SidebarCard,
  SidebarCardContent,
  SidebarCardHeaderSpaced,
} from 'components/SidebarCard';
import { SidebarCardContentWrapper } from 'components/SidebarCard/SidebarCard.styled';
import { useTranslation } from 'react-i18next';
import { useHookStoreProvider } from 'stores';
import { shortenAddress } from 'utils';
import {
  Amount,
  InfoDetail,
  VoteOption,
  VoteOptionWrapper,
  VotesAmount,
  VotesAmountWrapper,
} from './ProposalVotesCard.styled';
import { ProposalVotesCardProps } from './types';

const ProposalVotesCard: React.FC<ProposalVotesCardProps> = ({
  guildId,
  proposalId,
}) => {
  const { t } = useTranslation();
  const {
    hooks: {
      fetchers: { useGetVotes },
    },
  } = useHookStoreProvider();

  const votes = useGetVotes(guildId, proposalId);

  console.log({ votes });

  if (!votes.data) return null;

  return (
    <SidebarCard
      header={
        <>
          <SidebarCardHeaderSpaced>
            {t('votes')}
            <VotesAmountWrapper>
              <VotesAmount>{votes?.data?.length}</VotesAmount>
            </VotesAmountWrapper>
          </SidebarCardHeaderSpaced>
        </>
      }
    >
      <SidebarCardContentWrapper>
        <SidebarCardContent>
          {votes?.data?.map(vote => (
            <InfoDetail>
              <span>{shortenAddress(vote.voter)}</span>
              <VoteOptionWrapper>
                <VoteOption>{vote.optionLabel}</VoteOption>
              </VoteOptionWrapper>
              <Amount>{vote.votingPower}%</Amount>
            </InfoDetail>
          ))}
        </SidebarCardContent>
      </SidebarCardContentWrapper>
    </SidebarCard>
  );
};

export default ProposalVotesCard;
