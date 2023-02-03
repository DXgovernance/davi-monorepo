import {
  SidebarCard,
  SidebarCardContent,
  SidebarCardHeaderSpaced,
} from 'components/SidebarCard';
import { SidebarCardContentWrapper } from 'components/SidebarCard/SidebarCard.styled';
import { useTranslation } from 'react-i18next';
import { useHookStoreProvider } from 'stores';
import { VoteRow } from './components';
import { VotesAmount, VotesAmountWrapper } from './ProposalVotesCard.styled';
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
            <VoteRow {...vote} />
          ))}
        </SidebarCardContent>
      </SidebarCardContentWrapper>
    </SidebarCard>
  );
};

export default ProposalVotesCard;
