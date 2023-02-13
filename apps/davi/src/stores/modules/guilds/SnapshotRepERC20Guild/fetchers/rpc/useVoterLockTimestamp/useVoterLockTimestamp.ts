import { useContractRead } from 'wagmi';
import { BaseERC20Guild } from 'contracts/ts-files/BaseERC20Guild';
import { FetcherHooksInterface } from 'stores/types';

type IUseVoterLockTimestamp = FetcherHooksInterface['useVoterLockTimestamp'];

export const useVoterLockTimestamp: IUseVoterLockTimestamp = (
  contractAddress: `0x${string}`,
  userAddress: `0x${string}`
) => {
  // This method isn't supported in REP guilds
  const { data, ...rest } = useContractRead({
    address: null,
    abi: BaseERC20Guild.abi,
    functionName: 'getVoterLockTimestamp',
    args: [userAddress],
  });

  return {
    data: null,
    ...rest,
  };
};
