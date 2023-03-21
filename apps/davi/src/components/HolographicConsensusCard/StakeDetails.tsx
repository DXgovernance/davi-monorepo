import { shortenAddress } from 'utils';
import { Flex } from 'components/primitives/Layout';
import { Text } from 'components/primitives/Typography';
import { bigNumberToNumber } from 'hooks/Guilds/conversions/useBigNumberToNumber';
import { IStake, IStakeDetails } from './types';
import { StakeDetailsContainer } from './HolographicConsensusCard.styled';

export const StakeDetails = ({
  selectedStake,
  stakeDetails,
  tokenSymbol,
  tokenDecimals,
}: IStakeDetails) => {
  return (
    <StakeDetailsContainer>
      {stakeDetails[selectedStake].map((stake: IStake) => {
        const roundedBalance = bigNumberToNumber(stake.amount, tokenDecimals);

        return (
          <Flex
            direction="row"
            justifyContent="space-between"
            margin="6px 0px"
            key={stake.staker}
          >
            <span>{shortenAddress(stake.staker)}</span>
            <Text colorVariant="muted">
              {roundedBalance} {tokenSymbol}
            </Text>
          </Flex>
        );
      })}
    </StakeDetailsContainer>
  );
};
