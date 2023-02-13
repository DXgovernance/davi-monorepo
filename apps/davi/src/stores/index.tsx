import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNetwork, useProvider } from 'wagmi';
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
  const { chain } = useNetwork();

  const daoIdFromUrl = useMemo(
    () => (urlParams ? urlParams.params.daoId : ''),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [urlParams?.params?.daoId]
  );

  const daoId = useMemo(
    () => daoIdFromProps || daoIdFromUrl,
    [daoIdFromProps, daoIdFromUrl]
  );

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
  }, [daoId]);

  const [daoBytecode, setDaoBytecode] = useState<string>(null);
  const [dataSource, setDataSource] = useState<'primary' | 'secondary' | null>(
    null
  );
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
    if (isMatched) setIsLoading(false);
  }, [isMatched]);

  useEffect(() => {
    let cancelled = false;

    const getBytecodeHash = async () => {
      const localBytecodeHash = localStorage.getItem(
        `hashed-bytecode-${daoId}`
      );
      if (!localBytecodeHash) {
        const fetchedBytecode = await provider.getCode(daoId);
        if (fetchedBytecode) {
          const fetchedBytecodeHash = Web3.utils.keccak256(fetchedBytecode);
          localStorage.setItem(`hashed-bytecode-${daoId}`, fetchedBytecodeHash);
          return fetchedBytecodeHash;
        }
      }
      return localBytecodeHash;
    };

    getBytecodeHash().then(bytecodeHash => {
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
    if (!match) {
      setIsMatched(false);
      return null;
    }

    setIsMatched(true);
    return {
      name: match.name,
      bytecodes: match.bytecodes,
      capabilities: match.capabilities,
      dataSource: dataSource,
      hooks: {
        fetchers:
          dataSource === 'primary'
            ? match.hooks.fetchers.default
            : dataSource === 'secondary'
            ? match.hooks.fetchers.fallback
            : null,
        writers: match.hooks.writers,
      },
      checkDataSourceAvailability: match.checkDataSourceAvailability,
    };
  }, [daoBytecode, dataSource]);

  useEffect(() => {
    if (shouldSwitchDataSource) {
      setShouldSwitchDataSource(false);
      setIsLoading(false);
    }
  }, [shouldSwitchDataSource]);

  useEffect(() => {
    const getDataSourceAvailability = () => {
      if (governanceType) {
        const isDefaultSourceAvailable =
          governanceType.checkDataSourceAvailability(chain?.id);
        if (isDefaultSourceAvailable && dataSource !== 'primary') {
          setIsLoading(true);
          setShouldSwitchDataSource(true);
          setDataSource('primary');
        }
        if (!isDefaultSourceAvailable && dataSource !== 'secondary') {
          setIsLoading(true);
          setShouldSwitchDataSource(true);
          setDataSource('secondary');
        }
      }
    };
    getDataSourceAvailability();
    const interval = setInterval(() => {
      getDataSourceAvailability();
    }, CHECK_DATA_SOURCE_INTERVAL); // This implementation makes a data source health check every 10 seconds. This interval is arbitrary.

    return () => clearInterval(interval);
  }, [governanceType, dataSource, chain]);

  if (!daoId) return <>{children}</>;
  if (
    !governanceType ||
    !governanceType?.dataSource ||
    shouldSwitchDataSource
  ) {
    return <LoadingPage />;
  }

  return (
    <HookStoreContext.Provider value={{ ...governanceType, isLoading, daoId }}>
      {children}
    </HookStoreContext.Provider>
  );
};

export const useHookStoreProvider = () => useContext(HookStoreContext);
