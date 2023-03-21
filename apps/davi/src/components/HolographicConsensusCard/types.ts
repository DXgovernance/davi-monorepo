import { BigNumber } from 'ethers';

export type StakeOptions = 'for' | 'against';

export interface IStake {
  staker: string;
  amount: BigNumber;
}

export interface IStakes {
  for: IStake[];
  against: IStake[];
}

export interface IHolographicConsensusCard {
  proposalStakes: IStakes;
  schemeId: string;
}

export interface IStakeDetails {
  selectedStake: StakeOptions;
  stakeDetails: IStakes;
  tokenSymbol: string;
  tokenDecimals: number;
}
