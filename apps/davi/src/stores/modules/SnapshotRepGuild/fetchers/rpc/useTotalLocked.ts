import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';
import { useHookStoreProvider } from 'stores';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { ERC20SnapshotRep } from 'contracts/ts-files/ERC20SnapshotRep';
import { useListenToTokenTransfer } from '../../events/useListenToTokenTransfer';

export const useTotalLocked = (
  guildAddress: string,
  proposalId?: `0x${string}`
) => {
  const {
    hooks: {
      fetchers: { useSnapshotId, useDAOToken },
    },
  } = useHookStoreProvider();

  const { data: tokenAddress } = useDAOToken(guildAddress);

  const { data: snapshotId } = useSnapshotId({
    contractAddress: tokenAddress,
    proposalId,
  });

  const {
    data: totalLockedResponse,
    refetch: refetchTotalLockedResponse,
    ...totalLockedResponseRest
  } = useContractRead({
    address: guildAddress,
    abi: BaseERC20Guild.abi,
    functionName: 'getTotalLocked',
  });

  const {
    data: totalSupplyAtSnapshotResponse,
    refetch: refetchTotalSupplyAtSnapshotResponse,
    ...totalSupplyAtSnapshotResponseRest
  } = useContractRead({
    address: tokenAddress,
    abi: ERC20SnapshotRep.abi,
    functionName: 'totalSupplyAt',
    args: [BigNumber.from(snapshotId ? snapshotId : '0')],
  });

  useListenToTokenTransfer(tokenAddress, () => {
    refetchTotalLockedResponse();
    refetchTotalSupplyAtSnapshotResponse();
  });

  return snapshotId?.toString()
    ? {
        data: totalSupplyAtSnapshotResponse
          ? BigNumber.from(totalSupplyAtSnapshotResponse)
          : undefined,
        refetchTotalSupplyAtSnapshotResponse,
        ...totalSupplyAtSnapshotResponseRest,
      }
    : {
        data: totalLockedResponse
          ? BigNumber.from(totalLockedResponse)
          : undefined,
        refetchTotalLockedResponse,
        ...totalLockedResponseRest,
      };
};
