import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { SUPPORTED_SUBGRAPHS } from 'stores/types';
import { SUPPORTED_DAVI_NETWORKS } from 'utils';

// FIX: Add subgraphs URIs here
export const subgraphClientsUris = {
  [SUPPORTED_DAVI_NETWORKS.MAINNET_ID]: '',
  [SUPPORTED_DAVI_NETWORKS.ARBITRUM_ID]: '',
  [SUPPORTED_DAVI_NETWORKS.GNOSIS_ID]: '',
  // testnets
  [SUPPORTED_DAVI_NETWORKS.ARBITRUM_TESTNET_ID]: '',
  [SUPPORTED_DAVI_NETWORKS.GOERLI_ID]: '',
  [SUPPORTED_DAVI_NETWORKS.LOCALHOST_ID]: {
    [SUPPORTED_SUBGRAPHS.Guilds]:
      'http://127.0.0.1:8000/subgraphs/name/dxdao/guilds',
    [SUPPORTED_SUBGRAPHS.Governance1_5]:
      'http://127.0.0.1:8000/subgraphs/name/dxdao/dxgov-1-5',
  },
};

const setupApolloClient = (
  network: SUPPORTED_DAVI_NETWORKS,
  subgraph: SUPPORTED_SUBGRAPHS
) =>
  new ApolloClient({
    uri: subgraphClientsUris[network][subgraph],
    cache: new InMemoryCache(),
  });

export const apolloClient: {
  [chainId in SUPPORTED_DAVI_NETWORKS]: {
    [supportedSubgraph in SUPPORTED_SUBGRAPHS]: ApolloClient<NormalizedCacheObject>;
  };
} = {
  [SUPPORTED_DAVI_NETWORKS.MAINNET_ID]: {
    [SUPPORTED_SUBGRAPHS.Guilds]: setupApolloClient(
      SUPPORTED_DAVI_NETWORKS.MAINNET_ID,
      SUPPORTED_SUBGRAPHS.Guilds
    ),
    [SUPPORTED_SUBGRAPHS.Governance1_5]: setupApolloClient(
      SUPPORTED_DAVI_NETWORKS.MAINNET_ID,
      SUPPORTED_SUBGRAPHS.Governance1_5
    ),
  },
  [SUPPORTED_DAVI_NETWORKS.GNOSIS_ID]: {
    [SUPPORTED_SUBGRAPHS.Guilds]: setupApolloClient(
      SUPPORTED_DAVI_NETWORKS.GNOSIS_ID,
      SUPPORTED_SUBGRAPHS.Guilds
    ),
    [SUPPORTED_SUBGRAPHS.Governance1_5]: setupApolloClient(
      SUPPORTED_DAVI_NETWORKS.GNOSIS_ID,
      SUPPORTED_SUBGRAPHS.Governance1_5
    ),
  },
  [SUPPORTED_DAVI_NETWORKS.ARBITRUM_ID]: {
    [SUPPORTED_SUBGRAPHS.Guilds]: setupApolloClient(
      SUPPORTED_DAVI_NETWORKS.ARBITRUM_ID,
      SUPPORTED_SUBGRAPHS.Guilds
    ),
    [SUPPORTED_SUBGRAPHS.Governance1_5]: setupApolloClient(
      SUPPORTED_DAVI_NETWORKS.ARBITRUM_ID,
      SUPPORTED_SUBGRAPHS.Governance1_5
    ),
  },
  // testnets
  [SUPPORTED_DAVI_NETWORKS.GOERLI_ID]: {
    [SUPPORTED_SUBGRAPHS.Guilds]: setupApolloClient(
      SUPPORTED_DAVI_NETWORKS.GOERLI_ID,
      SUPPORTED_SUBGRAPHS.Guilds
    ),
    [SUPPORTED_SUBGRAPHS.Governance1_5]: setupApolloClient(
      SUPPORTED_DAVI_NETWORKS.GOERLI_ID,
      SUPPORTED_SUBGRAPHS.Governance1_5
    ),
  },
  [SUPPORTED_DAVI_NETWORKS.ARBITRUM_TESTNET_ID]: {
    [SUPPORTED_SUBGRAPHS.Guilds]: setupApolloClient(
      SUPPORTED_DAVI_NETWORKS.ARBITRUM_TESTNET_ID,
      SUPPORTED_SUBGRAPHS.Guilds
    ),
    [SUPPORTED_SUBGRAPHS.Governance1_5]: setupApolloClient(
      SUPPORTED_DAVI_NETWORKS.ARBITRUM_TESTNET_ID,
      SUPPORTED_SUBGRAPHS.Governance1_5
    ),
  },
  [SUPPORTED_DAVI_NETWORKS.LOCALHOST_ID]: {
    [SUPPORTED_SUBGRAPHS.Guilds]: setupApolloClient(
      SUPPORTED_DAVI_NETWORKS.LOCALHOST_ID,
      SUPPORTED_SUBGRAPHS.Guilds
    ),
    [SUPPORTED_SUBGRAPHS.Governance1_5]: setupApolloClient(
      SUPPORTED_DAVI_NETWORKS.LOCALHOST_ID,
      SUPPORTED_SUBGRAPHS.Governance1_5
    ),
  },
};
