import { getConnectors } from 'provider/wallets';
import { chains, providers } from 'provider';
import { createClient, configureChains } from 'wagmi';

const { provider, webSocketProvider } = configureChains(chains, providers);

export const wagmiClient: any = createClient({
  autoConnect: true,
  connectors: getConnectors(chains),
  provider,
  webSocketProvider,
});
