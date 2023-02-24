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
} from './fetchers/subgraph';

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
          useTotalLocked: null,
          useDAOToken: null,
          useIsProposalCreationAllowed,
          useProposalVotesOfVoter,
          useVoterLockTimestamp: null,
          useProposalCalls: null,
          useVotingResults: null,
          useVotingPowerOf: null,
          useMemberCount: null,
          useGetPermissions: null,
          useGuildConfig: null,
          useGetVotes: null,
          useGetMemberList: null,
          useGetAllPermissions: null,
          useGetNumberOfActiveProposals,
          useGuildProposalIds,
          useProposalState,
          useTimeDetail,
        },
        fallback: {
          useProposal: null,
          useSnapshotId: null,
          useTotalLocked: null,
          useDAOToken: null,
          useIsProposalCreationAllowed: null,
          useProposalVotesOfVoter: null,
          useVoterLockTimestamp: null,
          useProposalCalls: null,
          useVotingResults: null,
          useVotingPowerOf: null,
          useMemberCount: null,
          useGetPermissions: null,
          useGuildConfig: null,
          useGetVotes: null,
          useGetMemberList: null,
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
        useWithdrawTokens: null,
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
