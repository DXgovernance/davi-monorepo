import {
  SidebarCard,
  SidebarCardContent,
  SidebarCardHeaderSpaced,
} from 'components/SidebarCard';
import { SidebarCardContentWrapper } from 'components/SidebarCard/SidebarCard.styled';
import { useTranslation } from 'react-i18next';
import { shortenAddress } from 'utils';
import {
  Amount,
  InfoDetail,
  VoteOption,
  VoteOptionWrapper,
  VotesAmount,
  VotesAmountWrapper,
} from './ProposalVotesCard.styled';

const ProposalVotesCard: React.FC = () => {
  const { t } = useTranslation();

  const votes = [
    {
      voter: '0x4e91c9F086DB2Fd8aDb1888e9b18e17F70B7BdB6',
      vote: 'For',
      votingPower: '1,89%',
    },
    {
      voter: '0xC5B20AdE9c9Cd5e0CC087C62b26B815A4bc1881f',
      vote: 'For',
      votingPower: '1,89%',
    },
    {
      voter: '0xC5B20AdE9c9Cd5e0CC087C62b26B815A4bc1881f',
      vote: 'Against',
      votingPower: '1,89%',
    },
    {
      voter: '0xC5B20AdE9c9Cd5e0CC087C62b26B815A4bc1881f',
      vote: 'For',
      votingPower: '1,89%',
    },
    {
      voter: '0xC5B20AdE9c9Cd5e0CC087C62b26B815A4bc1881f',
      vote: 'For',
      votingPower: '1,89%',
    },
    {
      voter: '0xC5B20AdE9c9Cd5e0CC087C62b26B815A4bc1881f',
      vote: 'For',
      votingPower: '1,89%',
    },
    {
      voter: '0xC5B20AdE9c9Cd5e0CC087C62b26B815A4bc1881f',
      vote: 'For',
      votingPower: '1,89%',
    },
    {
      voter: '0xC5B20AdE9c9Cd5e0CC087C62b26B815A4bc1881f',
      vote: 'For',
      votingPower: '1,89%',
    },
  ];
  return (
    <SidebarCard
      header={
        <>
          <SidebarCardHeaderSpaced>
            {t('votes')}
            <VotesAmountWrapper>
              <VotesAmount>{votes.length}</VotesAmount>
            </VotesAmountWrapper>
          </SidebarCardHeaderSpaced>
        </>
      }
    >
      <SidebarCardContentWrapper>
        <SidebarCardContent>
          {votes?.map(vote => (
            <InfoDetail>
              <span>{shortenAddress(vote.voter)}</span>
              <VoteOptionWrapper>
                <VoteOption>{vote.vote}</VoteOption>
              </VoteOptionWrapper>
              <Amount>{vote.votingPower}</Amount>
            </InfoDetail>
          ))}
        </SidebarCardContent>
      </SidebarCardContentWrapper>
    </SidebarCard>
  );
};

export default ProposalVotesCard;
