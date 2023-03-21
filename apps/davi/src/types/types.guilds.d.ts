import { Moment } from 'moment';
import { BigNumber } from 'ethers';
import { FetcherHooksInterface } from 'stores/types';
import { IStakes } from 'components/HolographicConsensusCard/types';

type UseProposalVotesOfVoterReturn = ReturnType<
  FetcherHooksInterface['useProposalVotesOfVoter']
>['data'];

export interface Proposal {
  id: `0x${string}`;
  creator: string;
  startTime: Moment;
  endTime: Moment;
  to: string[];
  data?: string[];
  value: BigNumber[];
  totalOptions: BigNumber; // Not used in the codebase but in the deploy scripts
  title: string;
  contentHash: string;
  contractState: ContractState;
  totalVotes: BigNumber[];
  votesOfVoter?: UseProposalVotesOfVoterReturn;
  options: Option[];
  votes?: Vote[];
  executionTransactionHash?: string;
  subDao?: string;
  totalStaked?: [BigNumber, BigNumber];
  stakes?: IStakes;
}

export enum ProposalState {
  Active = 'Active',
  Executable = 'Executable',
  Executed = 'Executed',
  Rejected = 'Rejected',
  Failed = 'Failed',
  Finished = 'Finished',
}

export enum ContractState {
  Active = 'Active',
  Rejected = 'Rejected',
  Executed = 'Executed',
  Failed = 'Failed',
}
export interface ProposalMetadata {
  description: string;
  voteOptions: string[];
  discussionRef?: string;
  link?: {
    master: string;
    context: string;
  };
}
export interface Transaction {
  hash: string;
  from: string;
  summary?: string;
  receipt?: {
    transactionHash: string;
    blockNumber: number;
    status: number;
  };
  lastCheckedBlockNumber?: number;
  addedTime: number;
  confirmedTime?: number;
  runOnFinality?: (receipt: providers.TransactionReceipt) => void;
}

export enum GuildImplementationType {
  SnapshotRepERC20Guild = 'SnapshotRepERC20Guild',
  SnapshotERC20Guild = 'SnapshotERC20Guild',
  DXDGuild = 'DXDGuild',
  ERC20Guild = 'ERC20Guild',
  IERC20Guild = 'IERC20Guild',
}

export interface ENSAvatar {
  imageUrl?: string;
  ensName?: string;
}

export interface GuildConfigProps {
  name: string;
  token: `0x${string}`;
  permissionRegistry: string;
  proposalTime: BigNumber;
  timeForExecution: BigNumber;
  maxActiveProposals: BigNumber;
  votingPowerForProposalCreation: BigNumber;
  votingPowerForProposalExecution: BigNumber;
  tokenVault: `0x${string}`;
  lockTime: BigNumber;
  voteGas: BigNumber;
  maxGasPrice: BigNumber;
  votingPowerPercentageForProposalExecution: BigNumber;
  votingPowerPercentageForProposalCreation: BigNumber;
  minimumMembersForProposalCreation: BigNumber;
  minimumTokensLockedForProposalCreation: BigNumber;
}

export interface Vote {
  optionLabel: string;
  voter: string;
  votingPower: number;
}

export interface SubDAO {
  // scheme data
  id: string;
  name: string;
  averagesDownstakesOfBoosted: BigNumber;
  controller: string;
  isRegistered: boolean;
  orgBoostedProposalsCnt: BigNumber;
  paramsHash: string;
  permissionRegistry: string;
  stakingTokenBalance: BigNumber;

  // capabilities
  canChangeReputation: boolean;
  canMakeAvatarCalls: boolean;
  canManageSchemes: boolean;
  maxGasPrice: BigNumber;
  maxRepPercentageChange: BigNumber;
  type: string;
  voteGas: BigNumber;
  voteGasBalance: BigNumber;
  votingMachine: {
    stakingTokenAddress: string;
    boostedVoteRequiredPercentage: BigNumber;
    preBoostedVotePeriodLimit: BigNumber;
    boostedVotePeriodLimit: BigNumber;
    quietEndingPeriod: BigNumber;
  };
}

