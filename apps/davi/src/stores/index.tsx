import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useProvider } from 'wagmi';
import { useMatch } from 'react-router-dom';
import { GovernanceTypeInterface, HookStoreContextInterface } from './types';
import { governanceInterfaces } from './governanceInterfaces';
import Web3 from 'web3';
import { LoadingPage } from 'components/LoadingPage';

export const HookStoreContext = createContext<HookStoreContextInterface>(null);

export const HookStoreProvider = ({ children }) => {
  const urlParams = useMatch('/:chainName/:daoId/*');

  const [daoId, setDaoId] = useState(urlParams ? urlParams.params.daoId : '');
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
      setDaoId(urlParams?.params?.daoId);
    }
  }, [urlParams?.params?.daoId, daoId]);

  useEffect(() => {
    if (isMatched) setIsLoading(false);
  }, [isMatched]);

  useEffect(() => {
    const getBytecode = async () => {
      const localBtcode = localStorage.getItem(`hashed-bytecode-${daoId}`);
      if (!localBtcode) {
        const btcode = await provider.getCode(daoId);
        const hashedBytecode = Web3.utils.keccak256(btcode);
        setDaoBytecode(hashedBytecode);
        localStorage.setItem(`hashed-bytecode-${daoId}`, hashedBytecode);
        setIsLoading(false);
        return;
      }
      setDaoBytecode(localBtcode);
      setIsLoading(false);
    };

    getBytecode();
  }, [daoId, provider]);

  const governanceType: GovernanceTypeInterface = useMemo(() => {
    const match = governanceInterfaces.find(governance => {
      return governance.bytecodes.find(bytecode => bytecode === daoBytecode);
    });

    let returnedGovernanceType: GovernanceTypeInterface;

    if (match) {
      returnedGovernanceType = {
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
    } else {
      returnedGovernanceType = {
        name: governanceInterfaces[0].name,
        bytecodes: governanceInterfaces[0].bytecodes,
        capabilities: governanceInterfaces[0].capabilities,
        hooks: {
          fetchers: useDefaultDataSource
            ? governanceInterfaces[0].hooks.fetchers.default
            : governanceInterfaces[0].hooks.fetchers.fallback,
          writers: governanceInterfaces[0].hooks.writers,
        },

        checkDataSourceAvailability:
          governanceInterfaces[0].checkDataSourceAvailability,
      };
    }
    setIsMatched(true);
    return returnedGovernanceType;
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

  return isLoading ? (
    <LoadingPage />
  ) : (
    <HookStoreContext.Provider value={{ ...governanceType, isLoading, daoId }}>
      {children}
    </HookStoreContext.Provider>
  );
};

export const useHookStoreProvider = () => useContext(HookStoreContext);
