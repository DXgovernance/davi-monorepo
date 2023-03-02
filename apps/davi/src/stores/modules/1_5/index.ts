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
  useGetAllPermissions,
  useGetMemberList,
  useGuildConfig,
  useMemberCount,
  useTotalLocked,
  useVotingPowerOf,
  useVoterLockTimestamp,
} from './fetchers/subgraph';

import { useWithdrawTokens } from './writers/useWithdrawTokens';

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
          useSnapshotId: null,
          useTotalLocked,
          useDAOToken: null,
          useIsProposalCreationAllowed,
          useProposalVotesOfVoter,
          useVoterLockTimestamp,
          useProposalCalls: null,
          useVotingResults: null,
          useVotingPowerOf,
          useMemberCount,
          useGetPermissions: null,
          useGuildConfig,
          useGetVotes: null,
          useGetNumberOfActiveProposals,
          useGuildProposalIds,
          useProposalState,
          useTimeDetail,
          useGetMemberList,
          useGetAllPermissions,
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
        },
      },
      writers: {
        useApproveTokens: null,
        useCreateProposal: null,
        useExecuteProposal: null,
        useLockTokens: null,
        useVoteOnProposal: null,
        useWithdrawTokens: useWithdrawTokens,
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
