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
  useProposal,
  useSnapshotId,
  useIsProposalCreationAllowed,
  useProposalVotesOfVoter,
  useProposalCalls,
  useVotingResults,
} from '../common/fetchers';
import {
  useTotalLocked,
  useVoterLockTimestamp,
  useVotingPowerOf,
} from './fetchers/rpc';
import { checkDataSourceAvailability } from './checkDataSourceAvailability';
import localBytecodes from 'bytecodes/local.json';
import prodBytecodes from 'bytecodes/prod.json';

const GUILD_TYPE = 'SnapshotERC20Guild';
const localConfig = localBytecodes.find(({ type }) => type === GUILD_TYPE);
const prodConfig = prodBytecodes.find(({ type }) => type === GUILD_TYPE);

export const snapshotRepGuildImplementation: Readonly<FullGovernanceImplementation> =
  {
    name: 'SnapshotRepGuild',
    bytecodes: [
      '0x5220f03f768c7f09437ccf760eb5307dc60f60e18c9c9ff9599a9ab3ad71d2a0',
      '0xb33418b664bfb6eba3ea37a77429d95daee4f0ab24f47ee63c4669340c4aae5a',
      '0x56735be1df2293bbbc687502a3673244d05fac86940394cb2222ea884f304daf',
      localConfig.bytecodeHash as `0x${string}`,
      localConfig.deployedBytecodeHash as `0x${string}`,
      prodConfig.deployedBytecodeHash as `0x${string}`,
    ],
    hooks: {
      fetchers: {
        default: {
          useProposal,
          useSnapshotId,
          useTotalLocked,
          useIsProposalCreationAllowed,
          useProposalVotesOfVoter,
          useVoterLockTimestamp,
          useProposalCalls,
          useVotingResults,
          useVotingPowerOf,
        },
        fallback: {
          useProposal,
          useSnapshotId,
          useTotalLocked,
          useIsProposalCreationAllowed,
          useProposalVotesOfVoter,
          useVoterLockTimestamp,
          useProposalCalls,
          useVotingResults,
          useVotingPowerOf,
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
      votingPower: 'soulbound',
      tokenType: 'ERC20',
      consensus: 'quorum',
      votingStyle: 'competition',
      votingPowerTally: 'snapshot',
    },
    checkDataSourceAvailability,
  };
