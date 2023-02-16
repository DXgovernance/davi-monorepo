import { subgraphClientsUris } from 'clients/apollo';

// TODO: Check for health of connection if found

export const checkDataSourceAvailability = chainId => {
  // TODO: we need to find a way to check subgraphClientUris by chain id but also by governanceType
  return !!subgraphClientsUris[chainId];
};
