import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useProvider } from 'wagmi';
import { useMatch } from 'react-router-dom';
import { GovernanceTypeInterface, HookStoreContextInterface } from './types';
import { governanceInterfaces } from './governanceInterfaces';
import Web3 from 'web3';
import { LoadingPage } from 'components/LoadingPage';

export const HookStoreContext = createContext<HookStoreContextInterface>(null);

interface HookStoreProviderProps {
  daoId?: string;
}

export const HookStoreProvider: React.FC<
  PropsWithChildren<HookStoreProviderProps>
> = ({ children, daoId: daoIdFromProps }) => {
  const urlParams = useMatch('/:chainName/:daoId/*');

  const [daoIdFromUrl, setDaoIdFromUrl] = useState(
    urlParams ? urlParams.params.daoId : ''
  );
  const daoId = useMemo(
    () => daoIdFromProps || daoIdFromUrl,
    [daoIdFromProps, daoIdFromUrl]
  );

  const [daoBytecode, setDaoBytecode] = useState<string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [useDefaultDataSource, setUseDefaultDataSource] = useState(true);
  const [shouldSwitchDataSource, setShouldSwitchDataSource] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const provider = useProvider();
  const CHECK_DATA_SOURCE_INTERVAL = 5000;

  useEffect(() => {
    /*
      This is here to handle the store unmounting while developing, because react
      refreshes the page. If not here, it might cause the page stuck on "loading..."
    */
    return () => setIsLoading(true);
  }, []);

  useEffect(() => {
    if (urlParams?.params?.daoId) {
      setIsLoading(true);
      setDaoIdFromUrl(urlParams?.params?.daoId);
    }
  }, [urlParams?.params?.daoId]);

  useEffect(() => {
    if (isMatched) setIsLoading(false);
  }, [isMatched]);

  useEffect(() => {
    let cancelled = false;

    const getBytecode = async () => {
      let bytecodeHash = localStorage.getItem(`hashed-bytecode-${daoId}`);
      if (!bytecodeHash) {
        const bytecode = await provider.getCode(daoId);
        bytecodeHash = Web3.utils.keccak256(bytecode);

        localStorage.setItem(`hashed-bytecode-${daoId}`, bytecodeHash);
      }
      return bytecodeHash;
    };

    getBytecode().then(bytecodeHash => {
      if (!cancelled) {
        setDaoBytecode(bytecodeHash);
        setIsLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [daoId, provider]);

  const governanceType: GovernanceTypeInterface = useMemo(() => {
    let match = governanceInterfaces.find(governance => {
      return governance.bytecodes.find(bytecode => bytecode === daoBytecode);
    });

    // TODO: throw an error instead of falling back to a default if the store can't match the governance implementation
    if (!match) match = governanceInterfaces[0];

    setIsMatched(true);
    return {
      name: match.name,
      bytecodes: match.bytecodes,
      capabilities: match.capabilities,
      hooks: {
        fetchers: useDefaultDataSource
          ? match.hooks.fetchers.default
          : match.hooks.fetchers.fallback,
        writers: match.hooks.writers,
      },
      checkDataSourceAvailability: match.checkDataSourceAvailability,
    };
  }, [daoBytecode, useDefaultDataSource]);

  useEffect(() => {
    if (shouldSwitchDataSource) {
      setShouldSwitchDataSource(false);
      setIsLoading(false);
    }
  }, [shouldSwitchDataSource]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (governanceType) {
        const isDefaultSourceAvailable =
          governanceType.checkDataSourceAvailability();
        if (useDefaultDataSource !== isDefaultSourceAvailable) {
          setIsLoading(true);
          setShouldSwitchDataSource(true);
          setUseDefaultDataSource(isDefaultSourceAvailable);
        }
      }
    }, CHECK_DATA_SOURCE_INTERVAL); // This implementation makes a data source health check every 10 seconds. This interval is arbitrary.

    return () => clearInterval(interval);
  }, [governanceType, useDefaultDataSource]);

  // TODO: Make a better loading screen

  return isLoading ? (
    <LoadingPage />
  ) : (
    <HookStoreContext.Provider value={{ ...governanceType, isLoading, daoId }}>
      {children}
    </HookStoreContext.Provider>
  );
};

export const useHookStoreProvider = () => useContext(HookStoreContext);

// General TODOS
// TODO: port writer hooks
// TODO: port fetching hooks
// TODO: extract events from hooks (?)
// TODO: implement subgraph data fetching
// TODO: replace mentions of "guilds" for "dao" as is a more general term

/*
  React really doesn't like to switch hooks, and this has been a source of bugs. As far
  as I tested, it's been fixed.
  A way to trigger potential bugs is to navigate to different governance implementations
  using the UI and entering the guild address directly in the URL.
*/

/*
  REP guild: http://localhost:3000/#/localhost/0x140d68e4E3f80cdCf7036De007b3bCEC54D38b1f
  DXD guild: http://localhost:3000/#/localhost/0xE9bDaB08f2FBb370d2a6F6661a92d9B6157E9fd2
  SWP guild: http://localhost:3000/#/localhost/0xBF81De2C44B15e0d2c7AEaa0FBba4f1Dd02E3570
*/
