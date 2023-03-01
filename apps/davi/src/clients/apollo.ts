import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { SupportedSubgraphs } from 'stores/types';
import { SUPPORTED_DAVI_NETWORKS } from 'utils';

// FIX: Add subgraphs URIs here
export const subgraphClientsUris: {
  [chainId in SUPPORTED_DAVI_NETWORKS]: {
    [supportedSubgraph in SupportedSubgraphs]: string;
  };
} = {
  [SUPPORTED_DAVI_NETWORKS.MAINNET_ID]: {
    Guilds: '',
    'Governance1.5': '',
  },
  [SUPPORTED_DAVI_NETWORKS.ARBITRUM_ID]: {
    Guilds: '',
    'Governance1.5': '',
  },
  [SUPPORTED_DAVI_NETWORKS.GNOSIS_ID]: {
    Guilds: process.env.REACT_APP_DXGOV_GUILD_GRAPHQL_ENDPOINT_GNOSIS,
    'Governance1.5': process.env.REACT_APP_DXGOV_DAO_GRAPHQL_ENDPOINT_GNOSIS,
  },
  // testnets
  [SUPPORTED_DAVI_NETWORKS.ARBITRUM_TESTNET_ID]: {
    Guilds: '',
    'Governance1.5': '',
  },
  [SUPPORTED_DAVI_NETWORKS.GOERLI_ID]: {
    Guilds: '',
    'Governance1.5': '',
  },
  [SUPPORTED_DAVI_NETWORKS.LOCALHOST_ID]: {
    Guilds: 'http://127.0.0.1:8000/subgraphs/name/dxdao/guilds',
    'Governance1.5': 'http://127.0.0.1:8000/subgraphs/name/dxdao/dao',
  },
};

const setupApolloClient = (network: SUPPORTED_DAVI_NETWORKS) => {
  return {
    Guilds: new ApolloClient({
      uri: subgraphClientsUris[network]['Guilds'],
      cache: new InMemoryCache(),
    }),
    'Governance1.5': new ApolloClient({
      uri: subgraphClientsUris[network]['Governance1.5'],
      cache: new InMemoryCache(),
    }),
  };
};

export const apolloClient: {
  [chainId in SUPPORTED_DAVI_NETWORKS]: {
    [supportedSubgraph in SupportedSubgraphs]: ApolloClient<NormalizedCacheObject>;
  };
} = {
  [SUPPORTED_DAVI_NETWORKS.MAINNET_ID]: setupApolloClient(
    SUPPORTED_DAVI_NETWORKS.MAINNET_ID
  ),
  [SUPPORTED_DAVI_NETWORKS.GNOSIS_ID]: setupApolloClient(
    SUPPORTED_DAVI_NETWORKS.GNOSIS_ID
  ),
  [SUPPORTED_DAVI_NETWORKS.ARBITRUM_ID]: setupApolloClient(
    SUPPORTED_DAVI_NETWORKS.ARBITRUM_ID
  ),
  // testnets
  [SUPPORTED_DAVI_NETWORKS.GOERLI_ID]: setupApolloClient(
    SUPPORTED_DAVI_NETWORKS.GOERLI_ID
  ),
  [SUPPORTED_DAVI_NETWORKS.ARBITRUM_TESTNET_ID]: setupApolloClient(
    SUPPORTED_DAVI_NETWORKS.ARBITRUM_TESTNET_ID
  ),
  [SUPPORTED_DAVI_NETWORKS.LOCALHOST_ID]: setupApolloClient(
    SUPPORTED_DAVI_NETWORKS.LOCALHOST_ID
  ),
};
