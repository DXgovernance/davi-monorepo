import { useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';
import { useListenToLockAndWithdrawTokens } from '../../events/useListenToLockAndWithdrawTokens';
import { SnapshotERC20Guild } from 'contracts/ts-files/SnapshotERC20Guild';
import { useSnapshotId } from 'stores/modules/common/fetchers';

export const useTotalLocked = (
  guildAddress: string,
  proposalId?: `0x${string}`
) => {
  const { data: snapshotId } = useSnapshotId({
    contractAddress: guildAddress,
    proposalId,
  });

  const {
    data: totalLockedResponse,
    refetch: refetchGetTotalLocked,
    ...totalLockedResponseRest
  } = useContractRead({
    address: guildAddress,
    abi: SnapshotERC20Guild.abi,
    functionName: 'getTotalLocked',
  });

  const {
    data: totalLockedAtProposalSnapshotResponse,
    refetch: refetchTotalLockedAt,
    ...totalLockedAtProposalSnapshotResponseRest
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
        ...totalLockedAtProposalSnapshotResponseRest,
      }
    : {
        data: totalLockedResponse
          ? BigNumber.from(totalLockedResponse)
          : undefined,
        ...totalLockedResponseRest,
      };
};
