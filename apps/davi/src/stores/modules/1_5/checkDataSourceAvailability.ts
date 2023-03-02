import { subgraphClientsUris } from 'clients/apollo';
import { SupportedSubgraph } from 'stores/types';

export const checkDataSourceAvailability = async chainId => {
  try {
    if (!!subgraphClientsUris?.[chainId]?.[SupportedSubgraph.Governance1_5]) {
      console.debug('No subgraph URL for this chain, using fallback');
      return false;
    }

    const query = `{
    _meta {
      block {
        number
        timestamp
      }
    }
   }`;

    const response = await fetch(subgraphClientsUris[chainId]['Guilds'], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    const { data, errors } = await response.json();

    if (data?._meta?.block?.timestamp < Math.floor(Date.now() / 1000) - 600) {
      console.debug('Subgraph out of sync, using fallback');
      return false;
    }
    if (errors) {
      console.debug('Error occurred checking source health');
      console.error(errors);
      return false;
    }
    if (data) {
      console.debug('Subgraph exists and is above 10 minutes in sync');
      return true;
    } else {
      console.debug('No default data source data, using fallback');
      return false;
    }
  } catch {
    return false;
  }
};
