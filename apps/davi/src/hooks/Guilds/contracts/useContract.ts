import { useMemo } from 'react';
import { Contract } from 'ethers';
import { useProvider, useSigner } from 'wagmi';
import { getContract } from '@wagmi/core';
import VotingMachineContract from 'contracts/VotingMachine.json';
import { VotingMachine } from 'dxdao-contracts/types/VotingMachine';

import BaseERC20GuildContract from 'contracts/BaseERC20Guild.json';
import { ERC20Guild } from 'dxdao-contracts/types/ERC20Guild';
import ERC20_ABI from 'contracts/ERC20.json';
import { ERC20 } from 'dxdao-contracts/types/ERC20';
import SchemeContract from 'contracts/Scheme.json';
import { Scheme } from 'dxdao-contracts/types/Scheme';

export default function useContract<T extends Contract>(
  contractId: string,
  abi: any,
  chainId?: number,
  withSignerIfPossible = true
): T | null {
  const { data: signer, isSuccess } = useSigner();
  const provider = useProvider();

  return useMemo(() => {
    if (!provider || !contractId || !abi) return null;
    try {
      const contract = getContract({
        address: contractId,
        abi: abi,
        signerOrProvider: withSignerIfPossible && isSuccess ? signer : provider,
      });

      return contract;
    } catch (e) {
      console.error(e);
      return null;
    }
  }, [
    contractId,
    abi,
    provider,
    withSignerIfPossible,
    isSuccess,
    signer,
  ]) as unknown as T;
}

export function useERC20Guild(
  contractId: string,
  withSignerIfPossible?: boolean,
  chainId?: number
) {
  return useContract<ERC20Guild>(
    contractId,
    BaseERC20GuildContract.abi,
    chainId,
    withSignerIfPossible
  );
}

export function useSchemeContract(
  schemeAddress: string,
  withSignerIfPossible?: boolean,
  chainId?: number
) {
  return useContract<Scheme>(
    schemeAddress,
    SchemeContract.abi,
    chainId,
    withSignerIfPossible
  );
}

export function useVotingMachineContract(
  votingMachineAddress: string,
  withSignerIfPossible?: boolean,
  chainId?: number
) {
  return useContract<VotingMachine>(
    votingMachineAddress,
    VotingMachineContract.abi,
    chainId,
    withSignerIfPossible
  );
}

export function useERC20(
  tokenAddress?: string,
  chainId?: number,
  withSignerIfPossible?: boolean
) {
  return useContract<ERC20>(
    tokenAddress,
    ERC20_ABI.abi,
    chainId,
    withSignerIfPossible
  );
}
