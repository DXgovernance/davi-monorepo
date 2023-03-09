import { FullGovernanceImplementation } from 'stores/types';
import { checkDataSourceAvailability } from './checkDataSourceAvailability';

import {
  useProposalState,
  useTimeDetail,
  useIsProposalCreationAllowed,
} from './fetchers/rpc';

import {
  useProposal,
  useGuildProposalIds,
  useGetNumberOfActiveProposals,
  useProposalVotesOfVoter,
  useTotalLocked,
  useVotingPowerOf,
  useMemberCount,
  useGuildConfig,
  useGetMemberList,
  useGetAllPermissions,
  useGetPermissions,
  useVoterLockTimestamp,
  useVotingResults,
  useGetVotingMachineAddressBySchemeAddress,
} from './fetchers/subgraph';
import { useSnapshotId } from './fetchers/subgraph/useSnapshotId';
import { useVoteOnProposal, useWithdrawTokens } from './writers';

export const governance1_5Implementation: Readonly<FullGovernanceImplementation> =
  {
    name: 'Governance1_5',
    bytecodes: [
      '0x5a7c2852d5c2d5940670284861fb5549797abc88673d311096fd8fc2bb1c7dc0',
    ],
    hooks: {
      fetchers: {
        default: {
          useProposal,
          useSnapshotId,
          useTotalLocked,
          useDAOToken: null,
          useVoterLockTimestamp,
          useIsProposalCreationAllowed,
          useProposalVotesOfVoter,
          useProposalCalls: null,
          useVotingResults,
          useVotingPowerOf,
          useMemberCount,
          useGetPermissions,
          useGuildConfig,
          useGetVotes: null,
          useGetMemberList,
          useGetAllPermissions,
          useGetNumberOfActiveProposals,
          useGuildProposalIds,
          useProposalState,
          useTimeDetail,
          useGetVotingMachineAddressBySchemeAddress,
          useVotingPowerOfAt: null,
        },
        fallback: {
          useProposal: null,
          useSnapshotId: null,
          useTotalLocked,
          useDAOToken: null,
          useIsProposalCreationAllowed: null,
          useProposalVotesOfVoter: null,
          useVoterLockTimestamp,
          useProposalCalls: null,
          useVotingResults: null,
          useVotingPowerOf,
          useMemberCount,
          useGetPermissions: null,
          useGuildConfig,
          useGetVotes: null,
          useGetMemberList,
          useGetAllPermissions: null,
          useGetNumberOfActiveProposals: null,
          useGuildProposalIds: null,
          useProposalState: null,
          useTimeDetail: null,
          useGetVotingMachineAddressBySchemeAddress: null,
          useVotingPowerOfAt: null,
        },
      },
      writers: {
        useApproveTokens: null,
        useCreateProposal: null,
        useExecuteProposal: null,
        useLockTokens: null,
        useVoteOnProposal,
        useWithdrawTokens,
      },
    },
    capabilities: {
      votingPower: 'soulbound',
      tokenType: 'ERC20',
      consensus: 'holographic',
      votingStyle: 'binary',
      votingPowerTally: 'snapshot',
    },
    checkDataSourceAvailability,
  };
