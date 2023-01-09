import { FullGovernanceImplementation } from 'stores/types';
import { useProposal, useSnapshotId } from '../common/fetchers';
import { useTotalLocked } from './fetchers/rpc';
import { checkDataSourceAvailability } from './checkDataSourceAvailability';
import localBytecodes from 'dxdao-contracts/bytecodes/local.json';

const GUILD_TYPE = 'SnapshotRepERC20Guild';
const config = localBytecodes.find(({ type }) => type === GUILD_TYPE);

export const snapshotRepGuildImplementation: Readonly<FullGovernanceImplementation> =
  {
    name: 'SnapshotRepGuild',
    bytecodes: [
      '0x56735be1df2293bbbc687502a3673244d05fac86940394cb2222ea884f304daf',
      config.bytecodeHash as `0x${string}`,
      config.deployedBytecodeHash as `0x${string}`,
    ],
    hooks: {
      fetchers: {
        default: {
          useProposal,
          useSnapshotId,
          useTotalLocked,
        },
        fallback: {
          useProposal,
          useSnapshotId,
          useTotalLocked,
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
