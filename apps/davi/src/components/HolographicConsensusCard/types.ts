import { BigNumber } from 'ethers';
import { Proposal } from 'types/types.guilds.d';
import { TokenInfoWithType } from 'types/types';

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
  proposalStakeDetails: IStakes;
  proposalTotalStakes: Proposal['totalStaked'];
  schemeId: string;
}

export interface IStakeDetails {
  selectedStake: StakeOptions;
  stakeDetails: IStakes;
  tokenSymbol: string;
  tokenDecimals: number;
}

export interface IHolographicConsensusModal {
  tokenInfo: TokenInfoWithType;
  userStakeTokenBalance: BigNumber;
  speedometerValue: number;
}
