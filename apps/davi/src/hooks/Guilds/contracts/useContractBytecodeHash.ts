import { useNetwork, useProvider } from 'wagmi';
import { useEffect, useMemo, useState } from 'react';
import Web3 from 'web3';

export default function useContractBytecodeHash(
  contractId: string,
  chainId?: number
) {
  const { chain: wagmiChain } = useNetwork();
  const [isError, setIsError] = useState(false);

  const chainIdToUse = useMemo(
    () => chainId || wagmiChain?.id,
    [chainId, wagmiChain?.id]
  );
  const provider = useProvider({ chainId: chainIdToUse });

  const [bytecodeHash, setBytecodeHash] = useState<string>(null);
  useEffect(() => {
    setBytecodeHash(null);
    setIsError(false);

    if (!contractId) return () => {};

    let cancelled = false;
    const getBytecode = async () => {
      let bytecodeHash = localStorage.getItem(
        `hashed-bytecode=${chainIdToUse}-${contractId}`
      );
      if (!bytecodeHash) {
        const bytecode = await provider.getCode(contractId);
        bytecodeHash = Web3.utils.keccak256(bytecode);
        if (bytecodeHash) {
          localStorage.setItem(
            `hashed-bytecode-${chainIdToUse}-${contractId}`,
            bytecodeHash
          );
        }
      }
      return bytecodeHash;
    };

    getBytecode()
      .then(bytecodeHash => {
        if (!cancelled) {
          setBytecodeHash(bytecodeHash);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setIsError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [contractId, provider, chainIdToUse]);

  console.log({ contractId, chainId, isError });

  return {
    bytecodeHash: bytecodeHash,
    isLoading: !bytecodeHash && !isError,
    isError,
  };
}
