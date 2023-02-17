import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { getBigNumberPercentage } from 'utils/bnPercentage';

export default function useVotingPowerPercent(
  userVotingPower: BigNumber,
  totalVotingPower: BigNumber,
  decimals: number = 2
) {
  const votingPowerPercent = useMemo(() => {
    return getBigNumberPercentage(userVotingPower, totalVotingPower, decimals);
  }, [totalVotingPower, userVotingPower, decimals]);

  return votingPowerPercent;
}
