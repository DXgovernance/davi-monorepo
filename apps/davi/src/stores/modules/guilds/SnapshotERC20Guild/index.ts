import { FullGovernanceImplementation } from 'stores/types';
import {
  useApproveTokens,
  useCreateProposal,
  useExecuteProposal,
  useLockTokens,
  useVoteOnProposal,
  useWithdrawTokens,
} from './writers';
import {
  useGuildConfig as useGuildConfigFromSubgraph,
  useGetMemberList as useGetMemberListFromSubgraph,
  useGetNumberOfActiveProposals as useGetNumberOfActiveProposalsFromSubgraph,
  useProposal as useProposalFromSubgraph,
  useGuildProposalIds as useGuildProposalIdsFromSubgraph,
  useGetAllPermissions as useGetAllPermissionsFromSubgraph,
  useGetVotes as useGetVotesFromSubgraph,
  useProposalVotesOfVoter as useProposalVotesOfVoterFromSubgraph,
} from '../common/fetchers/subgraph';

import {
  useProposal,
  useSnapshotId,
  useDAOToken,
  useIsProposalCreationAllowed,
  useProposalVotesOfVoter,
  useProposalCalls,
  useVotingResults,
  useGetPermissions,
  useGuildConfig,
  useGetVotes,
  useGetMemberList,
  useGetAllPermissions,
  useGetNumberOfActiveProposals,
  useGuildProposalIds,
  useProposalState,
  useTimeDetail,
} from '../common/fetchers/rpc';
import {
  useTotalLocked,
  useVoterLockTimestamp,
  useVotingPowerOf,
  useMemberCount,
} from './fetchers/rpc';
import { checkDataSourceAvailability } from './checkDataSourceAvailability';
import localBytecodes from 'bytecodes/local.json';
import prodBytecodes from 'bytecodes/prod.json';

const GUILD_TYPE = 'SnapshotERC20Guild';
const localConfig = localBytecodes.find(({ type }) => type === GUILD_TYPE);
const prodConfig = prodBytecodes.find(({ type }) => type === GUILD_TYPE);

export const snapshotERC20GuildImplementation: Readonly<FullGovernanceImplementation> =
  {
    name: 'SnapshotERC20Guild',
    bytecodes: [
      '0xfc721cf4ee3e10d6df0dc8659bc71c86ec7b2116001838e1d9bc30ccfbe8cfac',
      '0xcfe42d56f58ab49603c49e6c7ca4bd3d2260cec51d296e4a5cfa2a407e299b6c',
      localConfig.bytecodeHash as `0x${string}`,
      localConfig.deployedBytecodeHash as `0x${string}`,
      prodConfig.deployedBytecodeHash as `0x${string}`,
    ],
    hooks: {
      fetchers: {
        default: {
          useProposal: useProposalFromSubgraph,
          useSnapshotId,
          useTotalLocked,
          useDAOToken,
          useIsProposalCreationAllowed,
          useProposalVotesOfVoter: useProposalVotesOfVoterFromSubgraph,
          useVoterLockTimestamp,
          useProposalCalls,
          useVotingResults,
          useVotingPowerOf,
          useMemberCount,
          useGetPermissions,
          useGuildConfig: useGuildConfigFromSubgraph,
          useGetVotes: useGetVotesFromSubgraph,
          useGetMemberList: useGetMemberListFromSubgraph,
          useGetAllPermissions: useGetAllPermissionsFromSubgraph,
          useGetNumberOfActiveProposals:
            useGetNumberOfActiveProposalsFromSubgraph,
          useGuildProposalIds: useGuildProposalIdsFromSubgraph,
          useProposalState,
          useTimeDetail,
        },
        fallback: {
          useProposal,
          useSnapshotId,
          useTotalLocked,
          useDAOToken,
          useIsProposalCreationAllowed,
          useProposalVotesOfVoter,
          useVoterLockTimestamp,
          useProposalCalls,
          useVotingResults,
          useVotingPowerOf,
          useMemberCount,
          useGetPermissions,
          useGuildConfig,
          useGetVotes,
          useGetMemberList,
          useGetAllPermissions,
          useGetNumberOfActiveProposals,
          useGuildProposalIds,
          useProposalState,
          useTimeDetail,
        },
      },
      writers: {
        useApproveTokens,
        useCreateProposal,
        useExecuteProposal,
        useLockTokens,
        useVoteOnProposal,
        useWithdrawTokens,
      },
    },
    capabilities: {
      votingPower: 'liquid',
      tokenType: 'ERC20',
      consensus: 'quorum',
      votingStyle: 'competition',
      votingPowerTally: 'snapshot',
    },
    checkDataSourceAvailability,
  };
