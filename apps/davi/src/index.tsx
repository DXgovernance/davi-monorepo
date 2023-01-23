import App from './App';
import initializeI18Next from './i18n';
import * as serviceWorker from './serviceWorker';
import moment from 'moment';
import * as ReactDOMClient from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { createClient, configureChains, WagmiConfig } from 'wagmi';
import { chains, providers } from 'provider';
import { getConnectors } from 'provider/wallets';
import EnsureReadOnlyConnection from 'components/Web3Modals/EnsureReadOnlyConnection';
import SyncRouterWithWagmi from 'components/Web3Modals/SyncRouterWithWagmi';
import { useEffect } from 'react';
import { loadFathom } from 'analytics/fathom';
import { SITE_ID } from 'configs';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { GraphApolloLink } from '@graphprotocol/client-apollo';
import * as GraphClient from '.graphclient';

const { provider, webSocketProvider } = configureChains(chains, providers);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: getConnectors(chains),
  provider,
  webSocketProvider,
});

const apolloClient = new ApolloClient({
  link: new GraphApolloLink(GraphClient),
  cache: new InMemoryCache(),
});

initializeI18Next();

moment.updateLocale('en', {
  relativeTime: {
    s: '1 second',
    m: '1 minute',
    h: '1 hour',
    d: '1 day',
  },
});

const Root = () => {
  useEffect(() => {
    loadFathom(SITE_ID)
      .then(() => {
        console.log('loadFathom: Fathom loaded.');
      })
      .catch(error => {
        console.error('Error loading Fathom analytics', error);
      });
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <WagmiConfig client={wagmiClient}>
        <HashRouter>
          <SyncRouterWithWagmi>
            <>
              <App />
              <EnsureReadOnlyConnection />
            </>
          </SyncRouterWithWagmi>
        </HashRouter>
      </WagmiConfig>
    </ApolloProvider>
  );
};
const rootElement = document.getElementById('root');
const root = ReactDOMClient.createRoot(rootElement);
root.render(<Root />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
