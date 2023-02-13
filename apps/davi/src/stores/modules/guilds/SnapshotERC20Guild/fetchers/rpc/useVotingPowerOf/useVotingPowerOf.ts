import useVotingPowerOfAt from 'Modules/Guilds/Hooks/useVotingPowerOfAt';
import { useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';
import { useListenToLockAndWithdrawTokens } from 'stores/modules/guilds/SnapshotERC20Guild/events';
import { SnapshotERC20Guild } from 'contracts/ts-files/SnapshotERC20Guild';
import { FetcherHooksInterface } from 'stores/types';

type IUseVotingPowerOf = FetcherHooksInterface['useVotingPowerOf'];

/**
 * Get the voting power of an account
 */
export const useVotingPowerOf: IUseVotingPowerOf = ({
  contractAddress: guildAddress,
  userAddress,
  snapshotId,
  fallbackSnapshotId = true,
}) => {
  const {
    data: votingPowerOfResponse,
    refetch: refetchVotingPowerOf,
    isError,
    isLoading,
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
        isError,
        isLoading,
      };
};
