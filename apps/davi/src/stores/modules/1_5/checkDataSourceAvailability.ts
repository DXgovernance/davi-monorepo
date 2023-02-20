import { subgraphClientsUris } from 'clients/apollo';

// TODO: Check for health of connection if found

export const checkDataSourceAvailability = chainId => {
  return !!subgraphClientsUris[chainId]['Governance1.5'];
};
