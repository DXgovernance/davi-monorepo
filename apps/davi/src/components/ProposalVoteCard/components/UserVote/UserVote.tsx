import { useTranslation } from 'react-i18next';
import { formatUnits } from 'ethers/lib/utils';

import useVotingPowerPercent from 'Modules/Guilds/Hooks/useVotingPowerPercent';
import { Container } from './UserVote.styled';
import { UserVoteProps } from './types';

const UserVote: React.FC<UserVoteProps> = ({
  voteData,
  votedOptionLabel,
  isPercent,
  userVote,
}) => {
  const { t } = useTranslation();
  const votingPowerPercent = useVotingPowerPercent(
    userVote?.votingPower,
    voteData?.totalLocked
  );

  const voting = `${formatUnits(userVote?.votingPower || 0)} ${
    voteData?.token?.symbol
  }`;

  return userVote.option ? (
    <Container>
      {t('voting.youVotedForOption', {
        optionLabel: votedOptionLabel,
        amount: isPercent ? `${votingPowerPercent}%` : voting,
      })}
    </Container>
  ) : null;
};

export default UserVote;
