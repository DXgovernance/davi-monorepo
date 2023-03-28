import { ChainProviderFn } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

const ALCHEMY_KEY = 'FvNKXPCxtzFYrtP4r45pmtxOR0AMCtQv';

const POKT_NETWORK_URLS = {
  '1': 'https://eth-mainnet.gateway.pokt.network/v1/lb/dda01e253305bbeac6507a80',
  '5': 'https://eth-goerli.gateway.pokt.network/v1/lb/dda01e253305bbeac6507a80',
  '100': 'https://poa-xdai.gateway.pokt.network/v1/lb/dda01e253305bbeac6507a80',
};

const customProvider = jsonRpcProvider({
  rpc(chain) {
    const localStorageRPC = localStorage.getItem(`customRPC[${chain.id}]`);
    return localStorageRPC ? { http: localStorageRPC } : null;
  },
  priority: 1,
});

const pokt = jsonRpcProvider({
  rpc(chain) {
    return { http: POKT_NETWORK_URLS[chain.id] } ?? null;
  },
  priority: 2,
});

const alchemy = alchemyProvider({ apiKey: ALCHEMY_KEY, priority: 3 });

const fallback = publicProvider({ priority: 4 });

export const providers: ChainProviderFn[] = [
  customProvider,
  pokt,
  alchemy,
  fallback,
];

if (process.env.NODE_ENV === 'development') {
  const localhost = jsonRpcProvider({
    rpc(chain) {
      return chain.id === 1337 ? { http: chain.rpcUrls.default } : null;
    },
    priority: 1,
  });
  providers.push(localhost);
}
