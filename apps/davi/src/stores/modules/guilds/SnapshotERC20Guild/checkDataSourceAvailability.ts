import { subgraphClientsUris } from 'clients/apollo';
import { SupportedSubgraph } from 'stores/types';

// TODO: Check for health of connection if found

export const checkDataSourceAvailability = chainId => {
  return !!subgraphClientsUris?.[chainId]?.[SupportedSubgraph.Guilds];
};
