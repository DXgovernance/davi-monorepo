import { BigNumber } from 'ethers';
import { Moment } from 'moment';
import { Option, Permission } from 'components/ActionsBuilder/types';
import {
  Proposal,
  GuildConfigProps,
  Vote,
  ProposalState,
} from 'types/types.guilds.d';

interface GovernanceCapabilities {
  votingPower: 'soulbound' | 'hybrid' | 'liquid';
  tokenType: 'ERC20' | 'ERC721';
  consensus: 'holographic' | 'quorum';
  votingStyle: 'binary' | 'competition';
  votingPowerTally: 'snapshot' | 'live';
}
// TODO: make a series of utils that parses the capabilities and translates them to a series of boolean flags, to make it easier to conditionally render UI elements

type SupportedGovernanceSystem =
  | 'SnapshotERC20Guild'
  | 'SnapshotRepERC20Guild'
  | 'Governance1_5';

export type SupportedSubgraphs = 'Guilds' | 'Governance1.5';

// TODO: Wrap fetcher return types in a common FetcherHookReturn type which has common loading / error statuses
export interface FetcherHooksInterface {
  useGetNumberOfActiveProposals: (daoId: string) => {
    data: BigNumber;
    isError: boolean;
    isLoading: boolean;
  };
  useGetMemberList: (daoId: string) => {
    data: { id: string; address: `0x${string}`; tokensLocked: BigNumber }[];
    isLoading: boolean;
    isError: boolean;
  };
  useGetAllPermissions: (
    daoId: string,
    filter?: 'tokens' | 'functionCalls'
  ) => {
    data: {
      id: string;
      to: string;
      from: string;
      valueAllowed: BigNumber;
      fromTime: BigNumber;
      functionSignature: string;
      allowed: boolean;
    }[];
    isLoading: boolean;
    isError: boolean;
  };
  useProposal: (
    daoId: string,
    proposalId: `0x${string}`
  ) => {
    data: Proposal;
    error: Error;
  };
  useSnapshotId: (useSnapshotIdProps: {
    contractAddress: string;
    proposalId: `0x${string}`;
  }) => { data: BigNumber };
  useTotalLocked: (
    daoId: string,
    proposalId?: `0x${string}`
  ) => {
    data: BigNumber;
  };
  useDAOToken: (daoId: string) => {
    data: `0x${string}`;
    isError: boolean;
    isLoading: boolean;
  };
  useIsProposalCreationAllowed: (
    daoId: string,
    userAddress: `0x${string}`
  ) => boolean;
  useProposalVotesOfVoter: (
    daoAddress: `0x${string}`,
    proposalId: `0x${string}`,
    userAddress: `0x${string}`
  ) => {
    data: { option: string; votingPower: BigNumber };
    isError: boolean;
    isLoading: boolean;
  };
  useVoterLockTimestamp: (
    daoAddress: `0x${string}`,
    userAddress: `0x${string}`
  ) => {
    data: moment.Moment;
  };
  useProposalCalls: (
    daoId: string,
    proposal: Proposal
  ) => { options: Option[] };
  useVotingResults: (
    daoId: string,
    proposalId: `0x${string}`,
    proposal: Proposal['totalVotes']
  ) => VoteData;
  useVotingPowerOf: (useVotingPowerOfProps: {
    contractAddress: string;
    userAddress: `0x${string}`;
    snapshotId?: string;
    fallbackSnapshotId?: boolean;
  }) => {
    data: BigNumber;
    isError: boolean;
    isLoading: boolean;
  };
  useMemberCount: (daoId: `0x${string}`) => { data: number };
  useGetPermissions: (
    daoAddress: `0x${string}`,
    permissionArgs: Permission
  ) => {
    data: {
      valueAllowed: BigNumber;
      fromTime: BigNumber;
    };
  };
  useGuildConfig: (
    guildAddress: string,
    proposalId?: `0x${string}`
  ) => {
    data: GuildConfigProps;
    isError: boolean;
    isLoading: boolean;
  };
  useGuildProposalIds: (daoId: `0x${string}`) => {
    data: `0x${string}`[];
    isError: boolean;
    isLoading: boolean;
    errorMessage: string;
  };
  useGetVotes: (
    daoId: string,
    proposal: Proposal
  ) => {
    data: Vote[];
    isError: boolean;
    isLoading: boolean;
  };
  useProposalState: (proposal: Proposal) => ProposalState;
  useTimeDetail: (
    daoId: string,
    status: ProposalState,
    endTime: Moment
  ) => { detail: string; moment: Moment };
}

export interface WriterHooksInteface {
  useApproveTokens: (
    tokenAddress: `0x${string}`
  ) => (daoTokenVault: string, amount?: string) => Promise<void>;
  useCreateProposal: (
    daoAddress: string,
    linkRef?: string
  ) => (
    title: string,
    description: string,
    toArray: string[],
    dataArray: string[],
    valueArray: BigNumber[],
    totalOptions: number,
    otherFields: Record<string, any>,
    skipMetadataUpload: boolean,
    handleMetadataUploadError: (error: Error) => void,
    cb: (error?: any, txtHash?: any) => void
  ) => Promise<void>;
  useExecuteProposal: (
    daoAddress: string
  ) => (proposalId: `0x${string}`) => Promise<void>;
  useLockTokens: (
    daoAddress: string
  ) => (
    stakeAmount: BigNumber,
    decimals?: number,
    symbol?: string
  ) => Promise<void>;
  useVoteOnProposal: (
    daoAddress: string
  ) => (
    proposalId: string,
    option: BigNumber,
    votingPower: BigNumber,
    title?: string,
    cb?: (error?: any, txtHash?: any) => void
  ) => Promise<void>;
  useWithdrawTokens: (
    daoAddress: string
  ) => (
    amount: BigNumber,
    tokenDecimals?: number,
    tokenSymbol?: string
  ) => Promise<void>;
}

interface HooksInterfaceWithFallback {
  fetchers: {
    default: FetcherHooksInterface;
    fallback: FetcherHooksInterface;
  };
  writers: WriterHooksInteface;
}

interface HooksInterfaceWithoutFallback
  extends Omit<HooksInterfaceWithFallback, 'fetchers'> {
  fetchers: FetcherHooksInterface;
}

export interface FullGovernanceImplementation {
  name: SupportedGovernanceSystem;
  bytecodes: `0x${string}`[];
  hooks: HooksInterfaceWithFallback;
  capabilities: GovernanceCapabilities;
  checkDataSourceAvailability: (chainId: number) => boolean;
}

export interface GovernanceTypeInterface
  extends Omit<FullGovernanceImplementation, 'hooks'> {
  hooks: HooksInterfaceWithoutFallback;
  dataSource: 'primary' | 'secondary' | null;
}

export interface HookStoreContextInterface extends GovernanceTypeInterface {
  daoId: string;
}
