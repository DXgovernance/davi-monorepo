import useENS from 'hooks/Guilds/ens/useENS';
import { shortenAddress } from 'utils';
import { Vote } from '../types';
import {
  Amount,
  InfoDetail,
  VoteOption,
  VoteOptionWrapper,
} from './VoteRow.styled';

const VoteRow: React.FC<Vote> = vote => {
  const { name } = useENS(vote.voter);

  return (
    <InfoDetail>
      <span>{name ?? shortenAddress(vote.voter)}</span>
      <VoteOptionWrapper>
        <VoteOption>{vote.optionLabel}</VoteOption>
      </VoteOptionWrapper>
      <Amount>{vote.votingPower}%</Amount>
    </InfoDetail>
  );
};

export default VoteRow;
