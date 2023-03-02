import { FullGovernanceImplementation } from 'stores/types';
import { checkDataSourceAvailability } from './checkDataSourceAvailability';
import { useGetAllPermissions } from './fetchers/subgraph/useGetAllPermissions';
import { useGetMemberList } from './fetchers/subgraph/useGetMemberList';
import { useGuildConfig } from './fetchers/subgraph/useGuildConfig';
import { useMemberCount } from './fetchers/subgraph/useMemberCount';
import { useTotalLocked } from './fetchers/subgraph/useTotalLocked';
import { useVotingPowerOf } from './fetchers/subgraph/useVotingPowerOf';
import { useVoterLockTimestamp } from './fetchers/useVoterLockTimestamp';
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
          useGetAllPermissions,
          useGetNumberOfActiveProposals: null,
          useGuildProposalIds: null,
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
