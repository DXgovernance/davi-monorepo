import { SnapshotRepERC20Guild } from 'contracts/ts-files/SnapshotRepERC20Guild';
import { BigNumber } from 'ethers';
import useCurrentSnapshotId from 'Modules/Guilds/Hooks/useCurrentSnapshotId';
import { FetcherHooksInterface } from 'stores/types';
import { useContractRead } from 'wagmi';
import { useListenToLockAndWithdrawTokens } from 'stores/modules/guilds/SnapshotERC20Guild/events';

type IUseVotingPowerOfAt = FetcherHooksInterface['useVotingPowerOfAt'];

/**
 * Get the voting power of an account at snapshot id
 */
export const useVotingPowerOfAt: IUseVotingPowerOfAt = (
  contractAddress: string,
  userAddress: `0x${string}`,
  snapshotId?: string,
  fallbackSnapshotId: boolean = true
) => {
  const { data: currentSnapshotId } = useCurrentSnapshotId({ contractAddress });
  const SNAPSHOT_ID = fallbackSnapshotId
    ? snapshotId ?? currentSnapshotId?.toString()
    : snapshotId;

  const { data, refetch, isError, isLoading } = useContractRead(
    SNAPSHOT_ID
      ? {
          address: contractAddress,
          abi: SnapshotRepERC20Guild.abi,
          functionName: 'votingPowerOfAt',
          args: [userAddress, BigNumber.from(SNAPSHOT_ID)],
        }
      : {
          address: contractAddress,
          abi: SnapshotRepERC20Guild.abi,
          functionName: 'votingPowerOf',
          args: [userAddress],
        }
  );

  useListenToLockAndWithdrawTokens(contractAddress, refetch);

  return {
    data: data ? BigNumber.from(data) : undefined,
    isError,
    isLoading,
  };
};
