import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { SupportedSubgraph } from 'stores/types';
import { CHAIN_ID, MAINNET_ID } from 'utils';

// FIX: Add subgraphs URIs here
export const subgraphClientsUris: Record<
  CHAIN_ID,
  Record<SupportedSubgraph, string>
> = {
  [CHAIN_ID.MAINNET]: {
    [SupportedSubgraph.Guilds]: '',
    [SupportedSubgraph.Governance1_5]: '',
  },
  [CHAIN_ID.ARBITRUM]: {
    [SupportedSubgraph.Guilds]: '',
    [SupportedSubgraph.Governance1_5]: '',
  },
  [CHAIN_ID.GNOSIS]: {
    Guilds: process.env.REACT_APP_DXGOV_GUILD_GRAPHQL_ENDPOINT_GNOSIS,
    'Governance1.5': process.env.REACT_APP_DXGOV_DAO_GRAPHQL_ENDPOINT_GNOSIS,
  },
  // testnets
  [CHAIN_ID.ARBITRUM_TESTNET]: {
    [SupportedSubgraph.Guilds]: '',
    [SupportedSubgraph.Governance1_5]: '',
  },
  [CHAIN_ID.GOERLI]: {
    [SupportedSubgraph.Guilds]: '',
    [SupportedSubgraph.Governance1_5]: '',
  },
  [CHAIN_ID.LOCALHOST]: {
    Guilds: 'http://127.0.0.1:8000/subgraphs/name/dxdao/guilds',
    'Governance1.5': 'http://127.0.0.1:8000/subgraphs/name/dxdao/dao',
  },
};

const setupApolloClient = (chainId: CHAIN_ID) => {
  return {
    [SupportedSubgraph.Guilds]: new ApolloClient({
      uri: subgraphClientsUris[chainId][SupportedSubgraph.Guilds],
      cache: new InMemoryCache(),
    }),
    [SupportedSubgraph.Governance1_5]: new ApolloClient({
      uri: subgraphClientsUris[chainId][SupportedSubgraph.Governance1_5],
      cache: new InMemoryCache(),
    }),
  };
};

export const apolloClient: Record<
  CHAIN_ID,
  Record<SupportedSubgraph, ApolloClient<NormalizedCacheObject>>
> = {
  [CHAIN_ID.MAINNET]: setupApolloClient(CHAIN_ID.MAINNET),
  [CHAIN_ID.GNOSIS]: setupApolloClient(CHAIN_ID.GNOSIS),
  [CHAIN_ID.ARBITRUM]: setupApolloClient(CHAIN_ID.ARBITRUM),
  // testnets
  [CHAIN_ID.GOERLI]: setupApolloClient(CHAIN_ID.GOERLI),
  [CHAIN_ID.ARBITRUM_TESTNET]: setupApolloClient(CHAIN_ID.ARBITRUM_TESTNET),
  [CHAIN_ID.LOCALHOST]: setupApolloClient(CHAIN_ID.LOCALHOST),
};

export const getApolloClient = (
  subgraph: SupportedSubgraph,
  chainId: CHAIN_ID = MAINNET_ID
) => {
  return apolloClient?.[chainId]?.[subgraph];
};
