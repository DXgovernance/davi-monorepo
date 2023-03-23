import { BigNumber } from 'ethers';
import { HolographicConsensusState, Proposal } from 'types/types.guilds.d';
import { TokenInfoWithType } from 'types/types';
import { WriterHooksInteface } from 'stores/types';

type IUseStakeOnProposal = WriterHooksInteface['useStakeOnProposal'];

export type StakeOptions = 'for' | 'against';

export interface IStake {
  id: string;
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
  proposalId: string;
  proposalState: HolographicConsensusState;
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
  stakeOnProposal: ReturnType<IUseStakeOnProposal>;
  proposalId: string;
  stakeDetails: IStakes;
  userAddress: string;
  proposalState: HolographicConsensusState;
}
