import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNetwork } from 'wagmi';
import { useMatch } from 'react-router-dom';
import { GovernanceTypeInterface, HookStoreContextInterface } from './types';
import { governanceInterfaces } from './governanceInterfaces';
import useContractBytecodeHash from 'hooks/Guilds/contracts/useContractBytecodeHash';

const CHECK_DATA_SOURCE_INTERVAL = 5000;

export const HookStoreContext = createContext<HookStoreContextInterface>(null);

interface HookStoreProviderProps {
  daoId?: string;
  loadingIndicator?: React.ReactElement;
  matchErrorIndicator?: React.ReactElement;
}

export const HookStoreProvider: React.FC<
  PropsWithChildren<HookStoreProviderProps>
> = ({
  children,
  daoId: daoIdFromProps,
  loadingIndicator,
  matchErrorIndicator,
}) => {
  const urlParams = useMatch('/:chainName/:daoId/*');
  const { chain } = useNetwork();
  const [governanceType, setGovernanceType] =
    useState<GovernanceTypeInterface>(null);

  const daoIdFromUrl = useMemo(
    () => (urlParams ? urlParams.params.daoId : ''),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [urlParams?.params?.daoId]
  );

  const daoId = useMemo(
    () => daoIdFromProps || daoIdFromUrl,
    [daoIdFromProps, daoIdFromUrl]
  );

  const {
    bytecodeHash: daoBytecodeHash,
    isLoading: isDaoBytecodeLoading,
    isError: isDaoBytecodeError,
  } = useContractBytecodeHash(daoId);

  const [dataSource, setDataSource] = useState<'primary' | 'secondary'>(null);
  const [targetDataSource, setTargetDataSource] = useState<
    'primary' | 'secondary'
  >(null);
  useEffect(() => {
    // This logic switches the data source after the loading indicators trigger
    // due to targetDataSource !== dataSource
    // Required to do switching this way to avoid React crashing
    if (targetDataSource !== dataSource) {
      setDataSource(targetDataSource);
    }
  }, [targetDataSource, dataSource]);

  useEffect(() => {
    async function load() {
      let match = governanceInterfaces.find(governance => {
        return governance.bytecodes.find(
          bytecode => bytecode === daoBytecodeHash
        );
      });

      if (!match) return null;

      setGovernanceType({
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
        checkDataSourceAvailability: await match.checkDataSourceAvailability,
      });
    }
    load();
  }, [daoBytecodeHash, dataSource]);

  useEffect(() => {
    const getDataSourceAvailability = async () => {
      if (governanceType) {
        const isDefaultSourceAvailable =
          await governanceType.checkDataSourceAvailability(chain?.id);
        if (isDefaultSourceAvailable && dataSource !== 'primary') {
          setTargetDataSource('primary');
        }
        if (!isDefaultSourceAvailable && dataSource !== 'secondary') {
          setTargetDataSource('secondary');
        }
      }
    };

    getDataSourceAvailability();
    const interval = setInterval(() => {
      getDataSourceAvailability();
    }, CHECK_DATA_SOURCE_INTERVAL);

    return () => clearInterval(interval);
  }, [governanceType, dataSource, chain]);

  if (!daoId) return <>{children}</>;
  if (isDaoBytecodeLoading) return loadingIndicator;

  if (!governanceType || isDaoBytecodeError) return matchErrorIndicator;

  if (!governanceType?.dataSource || targetDataSource !== dataSource)
    return loadingIndicator;

  return (
    <HookStoreContext.Provider value={{ ...governanceType, daoId }}>
      {children}
    </HookStoreContext.Provider>
  );
};

export const useHookStoreProvider = () => useContext(HookStoreContext);
