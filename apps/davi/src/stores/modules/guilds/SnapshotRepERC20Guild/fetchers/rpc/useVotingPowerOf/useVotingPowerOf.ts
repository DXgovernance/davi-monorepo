import { useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';
import { SnapshotRepERC20Guild } from 'contracts/ts-files/SnapshotRepERC20Guild';
import { useListenToTokenTransfer } from 'stores/modules/guilds/SnapshotRepERC20Guild/events';
import { FetcherHooksInterface } from 'stores/types';
import { useVotingPowerOfAt } from '../useVotingPowerOfAt';

type IUseVotingPowerOf = FetcherHooksInterface['useVotingPowerOf'];

/**
 * Get the voting power of an account
 */
export const useVotingPowerOf: IUseVotingPowerOf = ({
  contractAddress,
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
    address: contractAddress,
    abi: SnapshotRepERC20Guild.abi,
    functionName: 'votingPowerOf',
    args: [userAddress],
  });

  useListenToTokenTransfer(contractAddress, () => {
    refetchVotingPowerOf();
  });

  const votingPowerAtSnapshotResponse = useVotingPowerOfAt(
    contractAddress,
    userAddress,
    snapshotId,
    fallbackSnapshotId
  );

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
