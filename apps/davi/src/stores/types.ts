import { BigNumber } from 'ethers';
import { useProposal } from './modules/common/fetchers/useProposal';
import { Option } from 'components/ActionsBuilder/types';
import { GuildConfigProps } from './modules/common/fetchers/useGuildConfig';

interface GovernanceCapabilities {
  votingPower: 'soulbound' | 'hybrid' | 'liquid';
  tokenType: 'ERC20' | 'ERC721';
  consensus: 'holographic' | 'quorum';
  votingStyle: 'binary' | 'competition';
  votingPowerTally: 'snapshot' | 'live';
}
// TODO: make a series of utils that parses the capabilities and translates them to a series of boolean flags, to make it easier to conditionally render UI elements

type SupportedGovernanceSystem = 'SnapshotERC20Guild' | 'SnapshotRepGuild';

// TODO: Wrap fetcher return types in a common FetcherHookReturn type which has common loading / error statuses
export interface FetcherHooksInterface {
  useGetActiveProposals: (daoId: string) => {
    data: BigNumber;
    refetch: () => void;
  };
  useProposal: (
    daoId: string,
    proposalId: `0x${string}`
  ) => ReturnType<typeof useProposal>;
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
  useDAOToken: (daoId: string) => { data: `0x${string}` };
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
    refetch: () => void;
    isError: boolean;
    isLoading: boolean;
  };
  useVoterLockTimestamp: (
    daoAddress: `0x${string}`,
    userAddress: `0x${string}`
  ) => {
    data: moment.Moment;
    refetch: () => void;
  };
  useProposalCalls: (
    daoId: string,
    proposalId: `0x${string}`
  ) => { options: Option[] };
  useVotingResults: (daoId?: string, proposalId?: `0x${string}`) => VoteData;
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
  useGuildConfig: (
    guildAddress: string,
    proposalId?: `0x${string}`
  ) => {
    data: GuildConfigProps;
    isError: boolean;
    isLoading: boolean;
  };
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
  checkDataSourceAvailability: () => boolean;
}

export interface GovernanceTypeInterface
  extends Omit<FullGovernanceImplementation, 'hooks'> {
  hooks: HooksInterfaceWithoutFallback;
}

export interface HookStoreContextInterface extends GovernanceTypeInterface {
  isLoading: boolean;
  daoId: string;
}
