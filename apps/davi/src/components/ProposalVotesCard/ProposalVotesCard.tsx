import { useTranslation } from 'react-i18next';
import {
  SidebarCard,
  SidebarCardContent,
  SidebarCardHeaderSpaced,
} from 'components/SidebarCard';
import { SidebarCardContentWrapper } from 'components/SidebarCard/SidebarCard.styled';

import { VoteRow } from './components';
import { ProposalVotesCardProps } from './types';
import { VotesAmount, VotesAmountWrapper } from './ProposalVotesCard.styled';

const ProposalVotesCard: React.FC<ProposalVotesCardProps> = ({ proposal }) => {
  const { t } = useTranslation();

  const votes = proposal?.votes;

  if (!votes) return null;

  return (
    <SidebarCard
      header={
        <>
          <SidebarCardHeaderSpaced>
            {t('votes')}
            <VotesAmountWrapper>
              <VotesAmount>{votes?.length}</VotesAmount>
            </VotesAmountWrapper>
          </SidebarCardHeaderSpaced>
        </>
      }
    >
      <SidebarCardContentWrapper>
        <SidebarCardContent>
          {votes?.map(vote => (
            <VoteRow {...vote} />
          ))}
        </SidebarCardContent>
      </SidebarCardContentWrapper>
    </SidebarCard>
  );
};

export default ProposalVotesCard;
