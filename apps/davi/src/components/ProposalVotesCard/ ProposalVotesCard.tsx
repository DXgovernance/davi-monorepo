import { InfoDetail } from 'components/ProposalInfoCard/ProposalInfoCard.styled';
import { SidebarCard, SidebarCardContent } from 'components/SidebarCard';
import { useTranslation } from 'react-i18next';

const ProposalVotesCard: React.FC = () => {
  const { t } = useTranslation();

  const votes = [
    {
      address: 'charles.eth',
      vote: 'For',
      amount: '1,89%',
    },
    {
      address: '0x64e1...90E0',
      vote: 'For',
      amount: '1,89%',
    },
  ];
  return (
    <SidebarCard header={t('votes')}>
      <SidebarCardContent>
        {votes?.map(vote => (
          <InfoDetail>
            <span>{vote.address}</span>
            <span>{vote.vote}</span>
            <span>{vote.amount}</span>
          </InfoDetail>
        ))}
      </SidebarCardContent>
    </SidebarCard>
  );
};

export default ProposalVotesCard;
