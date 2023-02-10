import { snapshotERC20GuildImplementation } from './modules/SnapshotERC20Guild';
import { snapshotRepERC20GuildImplementation } from './modules/SnapshotRepERC20Guild';
import { FullGovernanceImplementation } from './types';

export const governanceInterfaces: FullGovernanceImplementation[] = [
  snapshotERC20GuildImplementation,
  snapshotRepERC20GuildImplementation,
];
