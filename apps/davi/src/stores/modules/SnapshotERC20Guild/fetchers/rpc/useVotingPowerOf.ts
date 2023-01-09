// import useGuildImplementationType from 'Modules/Guilds/Hooks/useGuildImplementationType';
import useVotingPowerOfAt from 'Modules/Guilds/Hooks/useVotingPowerOfAt';
import { useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';
import { useListenToLockAndWithdrawTokens } from '../../events/useListenToLockAndWithdrawTokens';
import { SnapshotERC20Guild } from 'contracts/ts-files/SnapshotERC20Guild';

interface useVotingPowerOfProps {
  contractAddress: string;
  userAddress: `0x${string}`;
  snapshotId?: string;
  fallbackSnapshotId?: boolean;
}
/**
 * Get the voting power of an account
 */
export const useVotingPowerOf = ({
  contractAddress: guildAddress,
  userAddress,
  snapshotId,
  fallbackSnapshotId = true,
}: useVotingPowerOfProps) => {
  const {
    data: votingPowerOfResponse,
    refetch: refetchVotingPowerOf,
    ...rest
  } = useContractRead({
    address: guildAddress,
    abi: SnapshotERC20Guild.abi,
    functionName: 'votingPowerOf',
    args: [userAddress],
  });

  useListenToLockAndWithdrawTokens(guildAddress, () => {
    refetchVotingPowerOf();
  });

  const votingPowerAtSnapshotResponse = useVotingPowerOfAt({
    contractAddress: guildAddress,
    userAddress,
    snapshotId,
    fallbackSnapshotId,
  });

  return snapshotId
    ? votingPowerAtSnapshotResponse
    : {
        data: votingPowerOfResponse
          ? BigNumber.from(votingPowerOfResponse)
          : undefined,
        ...rest,
      };
};
