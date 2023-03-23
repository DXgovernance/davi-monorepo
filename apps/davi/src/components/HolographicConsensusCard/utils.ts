import { BigNumber, FixedNumber } from 'ethers';
import { Proposal } from 'types/types.guilds.d';
import { IStakes } from './types';

export const calculateSpeedometerValue = (
  totalStaked: Proposal['totalStaked']
): number => {
  if (!totalStaked) return 0;

  const stakedAgainst = totalStaked[0];
  const stakedFor = totalStaked[1];

  const stakeDifference = stakedFor.sub(stakedAgainst);
  let percentage: number;

  if (stakeDifference.gt(0)) {
    percentage = stakeDifference.mul(100).div(stakedFor).toNumber();
  } else if (stakeDifference.eq(0)) {
    percentage = 0;
  } else {
    percentage = stakeDifference.mul(100).div(stakedAgainst).toNumber();
  }
  return 5000 + percentage * 50;
};

export const calculateBNPercentage = (
  value: BigNumber,
  percentage: string | number
) => {
  // percentage should be an integer (before being divided by 100)
  // if a percentage has decimals, it trims them
  // TODO: handle decimals?
  if (typeof percentage === 'string') {
    if (percentage.includes('.')) {
      const percentageSplit = percentage.split('.');
      percentage = percentageSplit[0];
    }
  }
  if (typeof percentage === 'number') {
    if (percentage % 1 !== 0) {
      percentage = Math.trunc(percentage);
    }
  }

  const valueFixed = FixedNumber.fromValue(value);
  const percentageFixed = FixedNumber.fromValue(BigNumber.from(percentage));
  const hundredFixed = FixedNumber.fromValue(BigNumber.from(100));

  const resultFixed = valueFixed
    .mulUnsafe(percentageFixed)
    .divUnsafe(hundredFixed);

  const resultFixedInteger = resultFixed.toString().split('.')[0];
  const resultBN = BigNumber.from(resultFixedInteger);
  return resultBN;
};

export const checkUserStakeOption = (
  userAddress: string,
  stakeDetails: IStakes
) => {
  const userStakeFor = stakeDetails.for.find(
    stake => stake.staker.toLowerCase() === userAddress.toLowerCase()
  );
  if (userStakeFor) return 'for';

  const userStakeAgainst = stakeDetails.against.find(
    stake => stake.staker.toLowerCase() === userAddress.toLowerCase()
  );
  if (userStakeAgainst) return 'against';

  return null;
};
