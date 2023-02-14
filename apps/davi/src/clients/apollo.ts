import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { SUPPORTED_DAVI_NETWORKS } from 'utils';

// FIX: Add subgraphs URIs here
export const subgraphClientsUris = {
  [SUPPORTED_DAVI_NETWORKS.MAINNET_ID]: '',
  [SUPPORTED_DAVI_NETWORKS.ARBITRUM_ID]: '',
  [SUPPORTED_DAVI_NETWORKS.GNOSIS_ID]:
    'https://api.thegraph.com/subgraphs/name/dxgovernance/guild-subgraph-gnosis',
  // testnets
  [SUPPORTED_DAVI_NETWORKS.ARBITRUM_TESTNET_ID]: '',
  [SUPPORTED_DAVI_NETWORKS.GOERLI_ID]: '',
  [SUPPORTED_DAVI_NETWORKS.LOCALHOST_ID]:
    'http://127.0.0.1:8000/subgraphs/name/mprasanjith/dxdao',
};

const setupApolloClient = (network: SUPPORTED_DAVI_NETWORKS) =>
  new ApolloClient({
    uri: subgraphClientsUris[network],
    cache: new InMemoryCache(),
  });

export const apolloClient: {
  [chainId in SUPPORTED_DAVI_NETWORKS]: ApolloClient<NormalizedCacheObject>;
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
