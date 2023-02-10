import { useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';
import { useListenToLockAndWithdrawTokens } from '../../../events/useListenToLockAndWithdrawTokens';
import { SnapshotERC20Guild } from 'contracts/ts-files/SnapshotERC20Guild';
import { useSnapshotId } from 'stores/modules/guilds/common/fetchers/rpc';
import { FetcherHooksInterface } from 'stores/types';

type IUseTotalLocked = FetcherHooksInterface['useTotalLocked'];

export const useTotalLocked: IUseTotalLocked = (guildAddress, proposalId?) => {
  const { data: snapshotId } = useSnapshotId({
    contractAddress: guildAddress,
    proposalId,
  });

  const { data: totalLockedResponse, refetch: refetchGetTotalLocked } =
    useContractRead({
      address: guildAddress,
      abi: SnapshotERC20Guild.abi,
      functionName: 'getTotalLocked',
    });

  const {
    data: totalLockedAtProposalSnapshotResponse,
    refetch: refetchTotalLockedAt,
  } = useContractRead({
    address: guildAddress,
    abi: SnapshotERC20Guild.abi,
    functionName: 'totalLockedAt',
    args: [BigNumber.from(snapshotId ? snapshotId : '0')],
  });

  useListenToLockAndWithdrawTokens(guildAddress, () => {
    refetchGetTotalLocked();
    refetchTotalLockedAt();
  });

  return snapshotId?.toString()
    ? {
        data: totalLockedAtProposalSnapshotResponse
          ? BigNumber.from(totalLockedAtProposalSnapshotResponse)
          : undefined,
      }
    : {
        data: totalLockedResponse
          ? BigNumber.from(totalLockedResponse)
          : undefined,
      };
};
