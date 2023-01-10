import { useContractRead } from 'wagmi';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';

export const useVoterLockTimestamp = (
  contractAddress: `0x${string}`,
  userAddress: `0x${string}`
) => {
  // This method isn't supported in REP guilds
  const { data, refetch, ...rest } = useContractRead({
    address: null,
    abi: BaseERC20Guild.abi,
    functionName: 'getVoterLockTimestamp',
    args: [userAddress],
  });

  return {
    data: null,
    refetch,
    ...rest,
  };
};
