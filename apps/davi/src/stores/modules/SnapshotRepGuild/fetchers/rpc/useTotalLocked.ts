import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { ERC20SnapshotRep } from 'contracts/ts-files/ERC20SnapshotRep';
import useGuildToken from 'Modules/Guilds/Hooks/useGuildToken';
import { useListenToTokenTransfer } from '../../events/useListenToTokenTransfer';
import { useSnapshotId } from 'stores/modules/common/fetchers';

export const useTotalLocked = (
  guildAddress: string,
  proposalId?: `0x${string}`
) => {
  const { data: guildTokenAddress } = useGuildToken(guildAddress);

  const { data: snapshotId } = useSnapshotId({
    contractAddress: guildAddress,
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
    address: guildTokenAddress,
    abi: ERC20SnapshotRep.abi,
    functionName: 'totalSupplyAt',
    args: [BigNumber.from(snapshotId ? snapshotId : '0')],
  });

  useListenToTokenTransfer(guildTokenAddress, () => {
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
