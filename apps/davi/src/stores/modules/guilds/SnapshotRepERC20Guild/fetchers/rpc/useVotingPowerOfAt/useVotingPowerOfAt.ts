import { SnapshotRepERC20Guild } from 'contracts/ts-files/SnapshotRepERC20Guild';
import { BigNumber } from 'ethers';
import useCurrentSnapshotId from 'Modules/Guilds/Hooks/useCurrentSnapshotId';
import { useContractRead } from 'wagmi';

type IUseVotingPowerOfAt = (
  contractAddress: string,
  userAddress: `0x${string}`,
  snapshotId?: string,
  fallbackSnapshotId?: boolean
) => {
  data: BigNumber;
  isError: boolean;
  isLoading: boolean;
};

/**
 * Get the voting power of an account at snapshot id
 */
export const useVotingPowerOfAt: IUseVotingPowerOfAt = (
  contractAddress,
  userAddress,
  snapshotId?,
  fallbackSnapshotId: boolean = true
) => {
  const { data: currentSnapshotId } = useCurrentSnapshotId({ contractAddress });
  const SNAPSHOT_ID = fallbackSnapshotId
    ? snapshotId ?? currentSnapshotId?.toString()
    : snapshotId;

  const { data, isLoading, isError } = useContractRead(
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

  return {
    data: data ? BigNumber.from(data) : undefined,
    isLoading,
    isError,
  };
};
