import { snapshotERC20GuildImplementation } from './modules/guilds/SnapshotERC20Guild';
import { snapshotRepERC20GuildImplementation } from './modules/guilds/SnapshotRepERC20Guild';
import { FullGovernanceImplementation } from './types';

export const governanceInterfaces: FullGovernanceImplementation[] = [
  snapshotERC20GuildImplementation,
  snapshotRepERC20GuildImplementation,
];
