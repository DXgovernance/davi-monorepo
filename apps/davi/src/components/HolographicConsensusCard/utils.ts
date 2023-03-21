import { Proposal } from 'types/types.guilds.d';

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
