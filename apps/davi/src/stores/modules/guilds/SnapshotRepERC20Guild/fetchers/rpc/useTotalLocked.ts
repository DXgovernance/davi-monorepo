import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { ERC20SnapshotRep } from 'contracts/ts-files/ERC20SnapshotRep';
import { useListenToTokenTransfer } from '../../events/useListenToTokenTransfer';
import {
  useDAOToken,
  useSnapshotId,
} from 'stores/modules/guilds/common/fetchers/rpc';
import { FetcherHooksInterface } from 'stores/types';

type IUseTotalLocked = FetcherHooksInterface['useTotalLocked'];

export const useTotalLocked: IUseTotalLocked = (guildAddress, proposalId) => {
  const { data: tokenAddress } = useDAOToken(guildAddress);
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
      }
    : {
        data: totalLockedResponse
          ? BigNumber.from(totalLockedResponse)
          : undefined,
      };
};
