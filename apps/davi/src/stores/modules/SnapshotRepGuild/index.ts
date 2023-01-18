import { FullGovernanceImplementation } from 'stores/types';
import {
  useProposal,
  useSnapshotId,
  useIsProposalCreationAllowed,
  useProposalVotesOfVoter,
  useProposalCalls,
  useVotingResults,
  useGetPermissions,
  useGuildConfig,
  useGetActiveProposals,
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
      '0x56735be1df2293bbbc687502a3673244d05fac86940394cb2222ea884f304daf',
      '0xec75e00a4daa1f5d4636a962298f55e322161e54b292f04a928c91f4f5333aed',
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
          useGetPermissions,
          useGuildConfig,
          useGetActiveProposals,
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
          useGetPermissions,
          useGuildConfig,
          useGetActiveProposals,
        },
      },
      writers: null,
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
