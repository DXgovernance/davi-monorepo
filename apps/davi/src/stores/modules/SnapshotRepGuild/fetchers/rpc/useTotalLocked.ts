import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { ERC20SnapshotRep } from 'contracts/ts-files/ERC20SnapshotRep';
import useGuildToken from 'Modules/Guilds/Hooks/useGuildToken';
import { useListenToTokenTransfer } from '../../events/useListenToTokenTransfer';
import { useSnapshotId } from 'stores/modules/common/fetchers';
import { FetcherHooksInterface } from 'stores/types';

type IUseTotalLocked = FetcherHooksInterface['useTotalLocked'];

export const useTotalLocked: IUseTotalLocked = (guildAddress, proposalId) => {
  const { data: guildTokenAddress } = useGuildToken(guildAddress);

  const { data: snapshotId } = useSnapshotId({
    contractAddress: guildAddress,
    proposalId,
  });

  const { data: totalLockedResponse, refetch: refetchTotalLockedResponse } =
    useContractRead({
      address: guildAddress,
      abi: BaseERC20Guild.abi,
      functionName: 'getTotalLocked',
    });

  const {
    data: totalSupplyAtSnapshotResponse,
    refetch: refetchTotalSupplyAtSnapshotResponse,
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
      }
    : {
        data: totalLockedResponse
          ? BigNumber.from(totalLockedResponse)
          : undefined,
      };
};
