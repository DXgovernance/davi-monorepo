import { subgraphClientsUris } from 'clients/apollo';
import { SUPPORTED_SUBGRAPHS } from 'stores/types';

// TODO: Check for health of connection if found

export const checkDataSourceAvailability = chainId => {
  return !!subgraphClientsUris[chainId][SUPPORTED_SUBGRAPHS.Governance1_5];
};
