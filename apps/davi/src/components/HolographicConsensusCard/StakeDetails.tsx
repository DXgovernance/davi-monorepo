import { Flex } from 'components/primitives/Layout';
import { shortenAddress } from 'utils';
import { IStake, IStakes, StakeOptions } from './HolographicConsensusCard';
import {
  MutedText,
  StakeDetailsContainer,
} from './HolographicConsensusCard.styled';

export const StakeDetails = ({
  selectedStake,
  stakeDetails,
}: {
  selectedStake: StakeOptions;
  stakeDetails: IStakes;
}) => {
  return (
    <StakeDetailsContainer>
      {stakeDetails[selectedStake].map((stake: IStake) => (
        <Flex direction="row" justifyContent="space-between" margin="6px 0px">
          <div>{shortenAddress(stake.address)}</div>
          <MutedText>{stake.amount}</MutedText>
        </Flex>
      ))}
    </StakeDetailsContainer>
  );
};
