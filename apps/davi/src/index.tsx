import App from './App';
import initializeI18Next from './i18n';
import * as serviceWorker from './serviceWorker';
import moment from 'moment';
import * as ReactDOMClient from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { WagmiConfig, useNetwork } from 'wagmi';
import EnsureReadOnlyConnection from 'components/Web3Modals/EnsureReadOnlyConnection';
import SyncRouterWithWagmi from 'components/Web3Modals/SyncRouterWithWagmi';
import { useEffect, useMemo } from 'react';
import { loadFathom } from 'analytics/fathom';
import { SITE_ID } from 'configs';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from 'clients/apollo';
import { wagmiClient } from 'clients/wagmi';
import { DEFAULT_CHAIN_ID } from 'utils';

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
  const { chain } = useNetwork();

  const chainId = useMemo(() => chain?.id || DEFAULT_CHAIN_ID, [chain]);

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
    <ApolloProvider client={apolloClient[chainId]}>
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
