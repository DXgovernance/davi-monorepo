// import useGuildImplementationType from 'Modules/Guilds/Hooks/useGuildImplementationType';
import useVotingPowerOfAt from 'Modules/Guilds/Hooks/useVotingPowerOfAt';
import { useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';
import { SnapshotRepERC20Guild } from 'contracts/ts-files/SnapshotRepERC20Guild';
import { useListenToTokenTransfer } from '../../events/useListenToTokenTransfer';

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
  contractAddress,
  userAddress,
  snapshotId,
  fallbackSnapshotId = true,
}: useVotingPowerOfProps) => {
  const {
    data: votingPowerOfResponse,
    refetch: refetchVotingPowerOf,
    ...rest
  } = useContractRead({
    address: contractAddress,
    abi: SnapshotRepERC20Guild.abi,
    functionName: 'votingPowerOf',
    args: [userAddress],
  });

  useListenToTokenTransfer(contractAddress, () => {
    refetchVotingPowerOf();
  });

  const votingPowerAtSnapshotResponse = useVotingPowerOfAt({
    contractAddress: contractAddress,
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
