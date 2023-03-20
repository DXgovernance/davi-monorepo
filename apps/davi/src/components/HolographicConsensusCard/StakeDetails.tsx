import { Flex } from 'components/primitives/Layout';
import { Text } from 'components/primitives/Typography';
import { shortenAddress } from 'utils';
import { IStake, IStakes, StakeOptions } from './HolographicConsensusCard';
import { StakeDetailsContainer } from './HolographicConsensusCard.styled';

interface IStakeDetails {
  selectedStake: StakeOptions;
  stakeDetails: IStakes;
  tokenSymbol: string;
}

export const StakeDetails = ({
  selectedStake,
  stakeDetails,
  tokenSymbol,
}: IStakeDetails) => {
  return (
    <StakeDetailsContainer>
      {stakeDetails[selectedStake].map((stake: IStake) => (
        <Flex direction="row" justifyContent="space-between" margin="6px 0px">
          <span>{shortenAddress(stake.address)}</span>
          <Text colorVariant="muted">
            {stake.amount} {tokenSymbol}
          </Text>
        </Flex>
      ))}
    </StakeDetailsContainer>
  );
};
