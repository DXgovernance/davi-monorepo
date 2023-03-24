import { Flex } from 'components/primitives/Layout';
import { Text } from 'components/primitives/Typography';
import { bigNumberToNumber } from 'hooks/Guilds/conversions/useBigNumberToNumber';
import { IStake, IStakeDetails } from './types';
import { StakeDetailsContainer } from './HolographicConsensusCard.styled';
import { useEnsName } from 'wagmi';
import { shortenAddress } from 'utils';

const Address = ({ address }: { address: `0x${string}` }) => {
  const { data: ensName } = useEnsName({ address, chainId: 1 });
  return <span>{ensName || shortenAddress(address)}</span>;
};

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
        const address = stake.staker as `0x${string}`;

        return (
          <Flex
            direction="row"
            justifyContent="space-between"
            margin="6px 0px"
            key={stake.id}
          >
            <Address address={address} />
            <Text colorVariant="muted">
              {roundedBalance} {tokenSymbol}
            </Text>
          </Flex>
        );
      })}
    </StakeDetailsContainer>
  );
};
